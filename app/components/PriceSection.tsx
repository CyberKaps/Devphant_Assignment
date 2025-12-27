"use client";

import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "./ProductForm";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

export default function PriceSection() {
  const { register, watch, setValue } =
    useFormContext<ProductFormValues>();

  const mrp = watch("mrp") || 0;
  const offer = watch("offer") || 0;

  function calcSelling(m: number, o: number) {
    return Math.round(m - (m * o) / 100);
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      <Input
        type="number"
        placeholder="MRP"
        {...register("mrp", {
          valueAsNumber: true,
          onChange: (e) => {
            const val = Number(e.target.value);
            setValue("sellingPrice", calcSelling(val, offer), {
              shouldValidate: true,
            });
          },
        })}
      />

      <Select
        {...register("offer", {
          valueAsNumber: true,
          onChange: (e) => {
            const val = Number(e.target.value);
            setValue("sellingPrice", calcSelling(mrp, val), {
              shouldValidate: true,
            });
          },
        })}
      >
        <option value={0}>0% Off</option>
        <option value={10}>10% Off</option>
        <option value={20}>20% Off</option>
      </Select>

      <Input
        type="number"
        readOnly
        {...register("sellingPrice", { valueAsNumber: true })}
      />
    </div>
  );
}
