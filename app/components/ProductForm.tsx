"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema";
import { categories } from "../mock";

import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { Card } from "./Card";

import PriceSection from "./PriceSection";
import ProductImages from "./ProductImage";
import VariantsSection from "./VariantSection";
import RightPanel from "./RightPanel";
import { saveProduct } from "@/app/utils/productStorage";
import toast from "react-hot-toast";


export type ProductFormValues = {
  title: string;
  category: string;
  subCategory: string;
  description: string;

  seller: string;
  mrp: number;
  offer: number;
  sellingPrice: number;

  brand?: string;
  warranty?: string;

  stock: number;
  images: string[];
  tags?: string[];
  material?: string;
  weight?: number;
  weightUnit?: "Kg" | "Gram";
  variants?: any;
};

export default function ProductForm() {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      subCategory: "",
      description: "",
      seller: "",
      mrp: 0,
      offer: 0,
      sellingPrice: 0,
      stock: 100,
      images: [],
      tags: [],
    },
  });

  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = methods;

  const category = watch("category");

  function onSubmit(data: ProductFormValues) {
  saveProduct(data);

  console.log("SAVED TO LOCAL STORAGE:", data);
  toast.success("Product saved successfully!", {
    iconTheme: {
    primary: "#dc2626",   
    secondary: "#fee2e2",
  },
  });
  reset();
}

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="mx-auto max-w-[1100px] px-4 py-3 space-y-3"
      >
        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between">
          <h1 className="text-base font-semibold">Add New Product</h1>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                reset({
                  title: "",
                  category: "",
                  subCategory: "",
                  description: "",
                  seller: "",
                  mrp: 0,
                  offer: 0,
                  sellingPrice: 0,
                  stock: 100,
                  images: [],
                  tags: [],
                  material: undefined,
                  weight: undefined,
                  weightUnit: undefined,
                })
              }
            >
              Cancel
            </Button>

           
            <Button type="submit" className="cursor-pointer" disabled={!isValid || isSubmitting}>
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>

    
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
   
          <div className="space-y-3">
            <Card>
              {/* TITLE */}
              <Field label="Title" required>
                <Input
                  placeholder="Add product title"
                  {...register("title")}
                />
                {errors.title && (
                  <p className="text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </Field>

              {/* CATEGORY */}
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category" required>
                  <Select {...register("category")}>
                    <option value="">Select category</option>
                    {Object.keys(categories).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </Field>

                <Field label="Sub Category" required>
                  <Select {...register("subCategory")}>
                    <option value="">Select sub-category</option>
                    {category &&
                      categories[
                        category as keyof typeof categories
                      ]?.map((sc) => (
                        <option key={sc} value={sc}>
                          {sc}
                        </option>
                      ))}
                  </Select>
                  {errors.subCategory && (
                    <p className="text-xs text-red-500">
                      {errors.subCategory.message}
                    </p>
                  )}
                </Field>
              </div>

              {/* DESCRIPTION */}
              <Field label="Description" required>
                <Textarea
                  rows={3}
                  placeholder="Enter your product description"
                  {...register("description")}
                />
                {errors.description && (
                  <p className="text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </Field>

              {/* IMAGES */}
              <ProductImages />
              {errors.images && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.images.message}
                </p>
              )}
            </Card>

            <Card>
              <PriceSection />
            </Card>

            <Card>
              <VariantsSection
                baseMrp={watch("mrp")}
                baseOffer={watch("offer")}
              />
            </Card>
          </div>

     
          <RightPanel />
        </div>
      </form>
    </FormProvider>
  );
}
