import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const imagesRouter = createTRPCRouter({
  getImages: protectedProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.imageAi.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return images;
  }),
  getCommunityImages: publicProcedure.query(async ({ ctx }) => {
    const images = await ctx.prisma.imageAi.findMany({
      take: 50,
      orderBy: {
        createdAt: "desc",
      },
    });
    return images;
  }),
});
