"use client";

import { useState } from "react";
import { colors, sizes } from "../mock";
import VariantTable from "./VariantTable";
import { Field } from "./ui/Field";
import { Select } from "./ui/Select";
import { Button } from "./ui/Button";


export default function VariantsSection() {
  const [type, setType] = useState<"" | "COLOR" | "SIZE">("");
  const [values, setValues] = useState<string[]>([]);

  function toggle(value: string) {
    setValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Variants</h3>

      <Field label="Option name">
        <Select
          value={type}
          onChange={(e) => {
            setType(e.target.value as "COLOR" | "SIZE");
            setValues([]);
          }}
        >
          <option value="">Select option</option>
          <option value="COLOR">Color</option>
          <option value="SIZE">Size</option>
        </Select>
      </Field>

      {type && (
        <Field label="Option values">
          <div className="flex flex-wrap gap-2">
            {(type === "COLOR" ? colors : sizes).map((value) => {
              const active = values.includes(value);

              return (

                <Button
                    key={value}
                    type="button"
                    variant="secondary"
                    onClick={() => toggle(value)}
                    className={`rounded-full px-3 py-1 text-xs ${
                        active ? "bg-blue-100 text-blue-700" : "bg-gray-100"
                    }`}
                    >
                    {value}
                </Button>
              );
            })}
          </div>
        </Field>
      )}

      {values.length > 0 && <VariantTable values={values} />}
    </div>
  );
}
