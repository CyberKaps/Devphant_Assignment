"use client";

import { useState } from "react";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";
import { ProductFormValues } from "./ProductForm";
import { Card } from "./Card";

interface RightPanelProps {
  register: UseFormRegister<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
}

export default function RightPanel({
  register,
  watch,
}: RightPanelProps) {
  const [tags, setTags] = useState<string[]>([""]);
  const [tagInput, setTagInput] = useState("");

  function addTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  }

  function removeTag(tag: string) {
    setTags(tags.filter((t) => t !== tag));
  }

  return (
    <div className="space-y-4">

      <Card>
        <div className=" p- space-y-3">
        <h3 className="text-sm font-medium">
          Product Organization
        </h3>

        <Field label="Brand Manufacturer">
          <Input
            placeholder="Adidas"
            {...register("brand")}
          />
        </Field>

        <Field label="Add Warranty">
          <Select {...register("warranty")}>
            <option value="">Select</option>
            <option value="6 Months">6 Months</option>
            <option value="12 Months">12 Months</option>
          </Select>
        </Field>

        <Field label="Seller Name">
          <Input
            placeholder="Sagar Sports Club"
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
        <div className=" p- space-y-3">
        <h3 className="text-sm font-medium">
          Material and Care
        </h3>

        <Field label="Material & Care">
          <Select>
            <option value="">Select Instructions</option>
            <option>Hand Wash</option>
            <option>Machine Wash</option>
            <option>Do Not Wash</option>
          </Select>
        </Field>

        <Field label="Product weight">
          <div className="grid grid-cols-[1fr_80px] gap-2">
            <Input
              type="number"
              step="0.001"
              placeholder="0.700"
            />
            <Select>
              <option>Kg</option>
              <option>Gram</option>
            </Select>
          </div>
        </Field>
      </div>
      </Card>

     
      <Card>
        <div className="flex justify-around rounded-lg space-y-2">
        <h3 className="text-sm font-medium">
          Stock Quantity
        </h3>

        <Input
          type="number"
          value={watch("stock") || 100}
          disabled
          className="bg-gray-100 text-gray-400 cursor-not-allowed"
        />
      </div>
      </Card>
    </div>
  );
}
