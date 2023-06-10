import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateImage(prompt: string): Promise<string | undefined> {
  if (env.MOCK_DALLE === "true") {
    return "http://localhost:3000/_next/image?url=https%3A%2F%2Foaidalleapiprodscus.blob.core.windows.net%2Fprivate%2Forg-pw6L2HV3tSz0mpXhGMgPJHq9%2Fuser-3IdYrplfPVQxytJZWrvv4ul7%2Fimg-QgD9TNahmx7qAmHUqSUa1Mfm.png%3Fst%3D2023-06-10T01%253A08%253A21Z%26se%3D2023-06-10T03%253A08%253A21Z%26sp%3Dr%26sv%3D2021-08-06%26sr%3Db%26rscd%3Dinline%26rsct%3Dimage%2Fpng%26skoid%3D6aaadede-4fb3-4698-a8f6-684d7786b067%26sktid%3Da48cca56-e6da-484e-a814-9c849652bcb3%26skt%3D2023-06-09T20%253A40%253A13Z%26ske%3D2023-06-10T20%253A40%253A13Z%26sks%3Db%26skv%3D2021-08-06%26sig%3DbH0BHwKlp1mFD8aoPhlUX7RDnYHDNK8Y9rWrA9gy9xk%253D&w=128&q=75";
  } else {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });

    return response.data.data[0]?.url;
  }
}

export const generateRouter = createTRPCRouter({
  generateImage: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });

      if (count <= 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You do not have enough credits",
        });
      }

      const url = await generateImage(input.prompt);

      return {
        imageUrl: url,
      };
    }),
});
