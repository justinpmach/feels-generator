import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
  getImages: protectedProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.imageAi.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    return images;
  }),
});
