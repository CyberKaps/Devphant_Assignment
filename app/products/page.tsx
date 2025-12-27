"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getProducts } from "@/app/utils/productStorage";
import { StoredProduct } from "@/app/types";
import { Card } from "@/app/components/Card";
import { Button } from "@/app/components/ui/Button";

export default function ProductsPage() {
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  if (products.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-2">
        <p className="text-sm text-gray-500">
          No products saved yet
        </p>
        <p className="text-xs text-gray-400">
          Add a product to see it listed here
        </p>

        <Button
          onClick={() => router.push("/")}
          className="mt-4 bg-red-600 hover:bg-red-700 text-white"
        >
          + Add Product
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
     
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={() => router.push("/")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            ← Add Product
          </Button>

          <h1 className="text-lg font-semibold">
            Saved Products
          </h1>
        </div>

        <span className="text-sm text-gray-500">
          {products.length} products
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((p) => (
          <Card key={p.id ?? `${p.title}-${p.createdAt}`}>
            <div className="space-y-1">
              <h2 className="text-sm font-medium line-clamp-2">
                {p.title}
              </h2>
              <p className="text-xs text-gray-500">
                {p.category} / {p.subCategory}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">
                ₹{p.sellingPrice}
              </span>

              <span className="text-xs text-gray-400 line-through">
                ₹{p.mrp}
              </span>

              {p.offer > 0 && (
                <span className="text-xs text-green-600 font-medium">
                  {p.offer}% OFF
                </span>
              )}
            </div>
            {Array.isArray(p.tags) && p.tags.length > 0 && (
              <div className="flex gap-1 flex-wrap">
                {p.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="text-xs bg-gray-100 px-2 py-0.5 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t">
              <span>Stock: {p.stock}</span>
              <span>
                {new Date(p.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
