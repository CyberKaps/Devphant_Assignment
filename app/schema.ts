import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  subCategory: z.string().min(1, "Sub-category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),

  mrp: z.number().positive("MRP must be greater than 0"),
  offer: z.number().min(0).max(100),
  sellingPrice: z.number().positive(),

  seller: z.string().min(1, "Seller name is required"),

  stock: z.number().min(0),
  images: z.array(z.string()).min(1, "At least one image is required"),

  // optional fields
  tags: z.array(z.string()).optional(),
  material: z.string().optional(),
  weight: z.number().optional(),
  weightUnit: z.enum(["Kg", "Gram"]).optional(),
});
