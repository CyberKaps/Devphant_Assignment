"use client";

import { useFormContext } from "react-hook-form";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { ProductFormValues } from "./ProductForm";

export default function ProductImages() {
  const { watch, setValue } =
    useFormContext<ProductFormValues>();

  const images = watch("images") || [];

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);

    setValue("images", [...images, url], {
      shouldValidate: true,
    });
  }

  return (
    <div className="rounded-lg bg-white space-y-2">
      <Field children label="Product Images" required />

      {images.length === 0 && (
        <label className="cursor-pointer">
          <div className="h-24 rounded-md bg-gray-100 flex flex-col items-center justify-center text-center gap-1">
            <div className="w-8 h-8 border border-red-500 text-red-500 rounded flex items-center justify-center text-lg">
              +
            </div>
            <p className="text-sm font-medium text-red-500">
              Add Media
            </p>
            <p className="text-xs text-gray-400">
              Upload images or videos of this product.
            </p>
          </div>

          <Input
            type="file"
            hidden
            accept="image/*"
            onChange={handleUpload}
          />
        </label>
      )}

      
      {images.length > 0 && (
        <div className="flex gap-3 flex-wrap">
          {images.map((img, index) => (
            <div
              key={index}
              className="w-20 h-20 rounded border overflow-hidden"
            >
              <img
                src={img}
                alt="product"
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          <label className="w-20 h-20 rounded border bg-gray-100 flex items-center justify-center cursor-pointer text-lg">
            +
            <Input
              type="file"
              hidden
              accept="image/*"
              onChange={handleUpload}
            />
          </label>
        </div>
      )}
    </div>
  );
}
