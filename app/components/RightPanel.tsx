"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { ProductFormValues } from "./ProductForm";
import { Card } from "./Card";

export default function RightPanel() {
  const { register, watch, setValue } =
    useFormContext<ProductFormValues>();


  const [tagInput, setTagInput] = useState("");
  const tags = watch("tags") || [];

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setValue("tags", [...tags, tagInput.trim()], {
        shouldValidate: true,
      });
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setValue(
      "tags",
      tags.filter((t) => t !== tag),
      { shouldValidate: true }
    );
  }

  /* ---------- DEFAULT STOCK ---------- */
  useEffect(() => {
    if (!watch("stock")) {
      setValue("stock", 100);
    }
  }, [setValue, watch]);

  return (
    <div className="space-y-4">
 
      <Card>
        <div className="space-y-3">
          <h3 className="text-xs font-semibold text-gray-700">
            Product Organization
          </h3>

          <Field label="Brand Manufacturer">
            <Input
              placeholder="Enter brand name"
              {...register("brand")}
            />
          </Field>

          <Field label="Select time period">
            <Select {...register("warranty")}>
              <option value="">Select</option>
              <option value="6 Months">6 Months</option>
              <option value="12 Months">12 Months</option>
            </Select>
          </Field>

          <Field label="Seller Name">
            <Input
              placeholder="Enter Seller Name"
              {...register("seller")}
            />
          </Field>

          <Field label="Tags">
            <div className="space-y-2">
              <Input
                placeholder="Add tag and press Enter"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
              />

              <div className="flex gap-2 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 bg-red-50 text-red-600 text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </Field>
        </div>
      </Card>

     
      <Card>
        <div className="space-y-3">
          <h3 className="text-sm font-medium">
            Material and Care
          </h3>

          <Field label="Material & Care">
            <Select {...register("material")}>
              <option value="">Select Instructions</option>
              <option value="Hand Wash">Hand Wash</option>
              <option value="Machine Wash">Machine Wash</option>
              <option value="Do Not Wash">Do Not Wash</option>
            </Select>
          </Field>

          <Field label="Product weight">
            <div className="grid grid-cols-[1fr_80px] gap-2">
              <Input
                type="number"
                step="0.001"
                placeholder="0.700"
                {...register("weight", { valueAsNumber: true })}
              />
              <Select {...register("weightUnit")}>
                <option value="Kg">Kg</option>
                <option value="Gram">Gram</option>
              </Select>
            </div>
          </Field>
        </div>
      </Card>


      <Card>
        <div className="space-y-2">
          <h3 className="text-sm font-medium">
            Stock Quantity
          </h3>

          <Input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            disabled
            className="bg-gray-100 text-gray-400 cursor-not-allowed"
          />
        </div>
      </Card>
    </div>
  );
}
