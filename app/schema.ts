import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1),
  category: z.string(),
  subCategory: z.string(),
  description: z.string(),

  mrp: z.number(),
  offer: z.number(),
  sellingPrice: z.number(),

  variants: z.any(),

  brand: z.string(),
  warranty: z.string(),
  seller: z.string(),
  stock: z.number(),
});
  