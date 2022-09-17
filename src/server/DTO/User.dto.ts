import z from "zod";

export const createUserSchema = z.object({
  website: z.string(),
  description: z.string(),
  ahaId: z.string(),
  dineoutId: z.string(),
  image: z.string().url().nullish(),
  menuUrl: z.string().url().nullable(),
});

export type createUserInput = z.TypeOf<typeof createUserSchema>;
