import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { b64Image } from "~/data/b64Image";
import AWS from "aws-sdk";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: env.ACCESS_KEY_ID,
    secretAccessKey: env.SECRET_ACCESS_KEY,
  },
  region: "us-east-1",
});

const FEELS_BUCKET = "feels-generator";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt: string, quantity = 1) {
  if (env.MOCK_DALLE === "true") {
    return new Array<string>(quantity).fill(b64Image);
  } else {
    const response = await openai.createImage({
      prompt,
      n: quantity,
      size: "512x512",
      response_format: "b64_json",
    });

    console.log("---");
    console.log(response.data.data[0]?.b64_json);
    console.log("---");

    return response.data.data.map((result) => result.b64_json || "");
  }
}

export const generateRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
        color: z.string(),
        shape: z.string(),
        style: z.string(),
        quantity: z.number().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: input.quantity,
          },
        },
        data: {
          credits: {
            decrement: input.quantity,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have enough credits",
        });
      }

      // const finalPrompt = `a modern icon in ${input.color} of ${input.prompt}`;
      const finalPrompt = `${input.prompt}`;

      const base64EncodedImages = await generateImage(
        finalPrompt,
        input.quantity
      );

      const createdImages = await Promise.all(
        base64EncodedImages.map(async (image) => {
          const imageAi = await ctx.prisma.imageAi.create({
            data: {
              prompt: input.prompt,
              userId: ctx.session.user.id,
            },
          });
          await s3
            .putObject({
              Bucket: FEELS_BUCKET,
              Body: Buffer.from(image, "base64"),
              Key: imageAi.id,
              ContentEncoding: "base64",
              ContentType: "image/png",
            })
            .promise();
          return imageAi;
        })
      );

      return createdImages.map((imageAi) => {
        return {
          imageUrl: `https://${FEELS_BUCKET}.s3.amazonaws.com/${imageAi.id}`,
        };
      });
    }),
});
