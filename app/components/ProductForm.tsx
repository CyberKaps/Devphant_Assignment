"use client";

import { useForm } from "react-hook-form";
import { categories } from "../mock";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import PriceSection from "./PriceSection";
import ProductImages from "./ProductImage";
import VariantsSection from "./VariantSection";
import RightPanel from "./RightPanel";
import { Card } from "./Card";

export type ProductFormValues = {
  title?: string;
  category?: string;
  subCategory?: string;
  description?: string;
  seller: string;
  offer: number;
  mrp?: number;
  sellingPrice?: number;
  brand?: string;
  warranty?: string;
  stock?: number;
  variants?: any;
};

export default function ProductForm() {
  const { register, watch, reset, handleSubmit } =
    useForm<ProductFormValues>({
      defaultValues: {
        seller: "",
        offer: 0,
        category: "",
        subCategory: "",
        description: "",
        title: "",
      },
    });

  const category = watch("category");

  function onSubmit(data: ProductFormValues) {
    console.log("SUBMITTED:", data); // ✅ will fire now
    alert("Product saved");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-[1100px] px-4 py-3 space-y-3"
    >
      {/* ===== HEADER (INSIDE FORM) ===== */}
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold">Add New Product</h1>

        <div className="flex gap-2">
          <Button type="button" variant="secondary" onClick={() => reset()}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </div>

      {/* ===== BODY ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* LEFT */}
        <div className="space-y-3">
          <Card>
            <Field label="Title" required>
              <Input
                placeholder="Add product title"
                {...register("title", { required: true })}
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Category" required>
                <Select {...register("category")}>
                  <option value="">Select category</option>
                  {Object.keys(categories).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </Select>
              </Field>

              <Field label="Sub Category" required>
                <Select {...register("subCategory")}>
                  <option value="">Select sub-category</option>
                  {category &&
                    categories[category as keyof typeof categories]?.map((sc) => (
                      <option key={sc}>{sc}</option>
                    ))}
                </Select>
              </Field>
            </div>

            <Field label="Description" required>
              <Textarea
                rows={3}
                placeholder="Enter your product description"
                {...register("description")}
              />
            </Field>

            <ProductImages />
          </Card>

          <Card>
            <PriceSection register={register} watch={watch} />
          </Card>

          <Card>
            <VariantsSection
              baseMrp={watch("mrp") || 0}
              baseOffer={watch("offer") || 0}
            />
          </Card>
        </div>

        {/* RIGHT */}
        <RightPanel register={register} watch={watch} />
      </div>
    </form>
  );
}
