export type VariantType = "SIZE_UK" | "SIZE_US" | "COLOR";

export type VariantRow = {
  key: string;
  label: string;
  mrp: number;
  offer: number;
  selling: number;
  stock: number;
  weight: number;
};



import { ProductFormValues } from "@/app/components/ProductForm";

export type StoredProduct = ProductFormValues & {
  id: string;
  createdAt: string;
};
