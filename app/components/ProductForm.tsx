"use client";

import { useForm } from "react-hook-form";
import { categories } from "../mock";


type CategoriesType = {
  [key: string]: string[];
};
const typedCategories: CategoriesType = categories;
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
  const { register, watch, reset, handleSubmit } = useForm<ProductFormValues>({
    defaultValues: {
      seller: "Sagar Sports Club",
      offer: 0,
      category: "",
      subCategory: "",
      description: "",
      title: "",
    },
  });

  const category = watch("category");

  function onSubmit(data: any) {
    const existing = JSON.parse(
      localStorage.getItem("products") || "[]"
    );
    localStorage.setItem(
      "products",
      JSON.stringify([...existing, data])
    );
    alert("Product saved");
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
    >
      
      <div className="space-y-4">
        <Card>
          <Field label="Title" required>
            <Input placeholder="Add product title" {...register("title", { required: true })} />
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
                  typedCategories[category]?.map((sc) => (
                    <option key={sc}>{sc}</option>
                  ))}
              </Select>
            </Field>
          </div>

          <Field label="Description" required>
            <Textarea placeholder="Enter you product description" {...register("description")} rows={4} />
          </Field>

        <Card>
          <ProductImages />
        </Card>

        </Card>


      
        <Card>
          <PriceSection register={register} watch={watch} />
        </Card>

        <Card>
          <VariantsSection />
        </Card>
      </div>

      <div className="space-y-4">
        <Card title="Product Organization">
          <RightPanel register={register} watch={watch} />
        </Card>
      </div>

      <div className="col-span-full flex gap-3">
        <Button type="submit">Save</Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => reset()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
