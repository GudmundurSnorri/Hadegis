import { createRouter } from "./context";
import { string, z } from "zod";
import { createOfferSchema } from "../DTO/Offer.dto";
import { createUserSchema } from "../DTO/User.dto";

export const exampleRouter = createRouter()
  .query("hello", {
    input: z
      .object({
        text: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    },
  })
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.offer.findMany();
    },
  })
  .mutation("createOffer", {
    input: createOfferSchema,
    async resolve({ input, ctx }) {
      const userName = ctx.session?.user?.id;
      const returnObject = ctx.prisma.offer.create({
        data: {
          userId: userName,
          title: input.title,
          description: input.description,
          price: input.price,
          image: input.image,
          active: input.active,
          dateFrom: input.dateFrom,
          dateTo: input.dateTo,
          typeOfOffer: input.typeOfOffer,
          whichWeekDay: input.whichWeekDay,
          whichMonth: input.whichMonth,
        },
      });
      return returnObject;
    },
  })
  .mutation("updateUserInfo", {
    input: createUserSchema,
    async resolve({
      ctx,
      input: { description, website, ahaId, dineoutId, image },
    }) {
      const findUserObject = await ctx.prisma.user.findFirstOrThrow({
        where: {
          id: "cl7mj1l6j0074jqlcb2eetqzk",
        },
      });

      const updateUserObject = ctx.prisma.user.update({
        where: {
          id: "cl7mj1l6j0074jqlcb2eetqzk",
        },
        data: {
          website: website || findUserObject.website,
          ahaId: ahaId || findUserObject.ahaId,
          dineoutId: dineoutId || findUserObject.dineoutId,
          image: image || findUserObject.image,
          description: description || findUserObject.description,
        },
      });

      return updateUserObject;
    },
  })
  .query("getSpecificUser", {
    input: z.object({
      email: string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.user.findFirstOrThrow({
        where: {
          email: input.email,
        },
      });
    },
  })
  .query("getOfferByRestaurant", {
    input: z.object({
      userId: string(),
    }),
    async resolve({ ctx, input }) {
      const result = await ctx.prisma.offer.findMany({
        where: {
          userId: input.userId,
        },
      });

      return result;
    },
  })
  .mutation("deleteOffer", {
    input: z.object({
      offerId: string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.offer.delete({
        where: {
          id: input.offerId,
        },
      });
    },
  })
  .mutation("setActiveStatus", {
    input: z.object({
      activeStatus: z.boolean(),
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.offer.update({
        where: {
          id: input.id,
        },
        data: {
          active: input.activeStatus,
        },
      });
    },
  })
  .query("getSpecificOffer", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.offer.findFirstOrThrow({
        where: {
          id: input.id,
        },
      });
    },
  })
  .mutation("updateOffer", {
    input: z.object({
      data: createOfferSchema,
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      return await ctx.prisma.offer.update({
        where: {
          id: input.id,
        },
        data: input.data,
      });
    },
  });
