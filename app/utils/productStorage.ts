import { StoredProduct } from "@/app/types";
import { ProductFormValues } from "@/app/components/ProductForm";

const STORAGE_KEY = "products";

export function saveProduct(product: ProductFormValues) {
  if (typeof window === "undefined") return;

  const existing = localStorage.getItem(STORAGE_KEY);

  const products: StoredProduct[] = existing
    ? JSON.parse(existing)
    : [];

  const newProduct: StoredProduct = {
    ...product,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  products.push(newProduct);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function getProducts(): StoredProduct[] {
  if (typeof window === "undefined") return [];

  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
