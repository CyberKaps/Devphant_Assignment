"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/Button";
import { Select } from "./ui/Select";
import { Input } from "./ui/Input";
import { Field } from "./ui/Field";

type VariantType = "SIZE_UK" | "SIZE_US" | "COLOR";

const OPTIONS: Record<VariantType, string[]> = {
  SIZE_UK: ["3", "4", "5", "6", "7", "8", "9", "10"],
  SIZE_US: ["6", "7", "8", "9", "10", "11"],
  COLOR: ["Red", "Blue", "Black", "White"],
};

type VariantRow = {
  value: string;
  mrp: number;
  offer: number;
  sellingPrice: number;
  stock: number;
};

export default function VariantsSection({
  baseMrp,
  baseOffer,
}: {
  baseMrp: number;
  baseOffer: number;
}) {
  const [editing, setEditing] = useState(false);
  const [bulkEdit, setBulkEdit] = useState(false);
  const [type, setType] = useState<VariantType | "">("");
  const [values, setValues] = useState<string[]>([]);
  const [rows, setRows] = useState<VariantRow[]>([]);

  function calcSellingPrice(mrp: number, offer: number) {
    return Math.round(mrp - (mrp * offer) / 100);
  }

  function toggleValue(value: string) {
    setValues((prev) =>
      prev.includes(value)
        ? prev.filter((v) => v !== value)
        : [...prev, value]
    );
  }

  /** Sync rows with selected values + base price */
  useEffect(() => {
    const updated = values.map((v) => {
      const existing = rows.find((r) => r.value === v);
      return (
        existing || {
          value: v,
          mrp: baseMrp,
          offer: baseOffer,
          sellingPrice: calcSellingPrice(baseMrp, baseOffer),
          stock: 100,
        }
      );
    });
    setRows(updated);
  }, [values, baseMrp, baseOffer]);

  function updateRow(
    value: string,
    key: keyof VariantRow,
    val: number
  ) {
    setRows((prev) =>
      prev.map((r) =>
        r.value === value
          ? {
              ...r,
              [key]: val,
              sellingPrice:
                key === "mrp" || key === "offer"
                  ? calcSellingPrice(
                      key === "mrp" ? val : r.mrp,
                      key === "offer" ? val : r.offer
                    )
                  : r.sellingPrice,
            }
          : r
      )
    );
  }

  function applyBulk() {
    setRows((prev) =>
      prev.map((r) => ({
        ...r,
        mrp: baseMrp,
        offer: baseOffer,
        sellingPrice: calcSellingPrice(baseMrp, baseOffer),
      }))
    );
    setBulkEdit(false);
  }

  const optionLabel =
    type === "SIZE_UK"
      ? "Size UK"
      : type === "SIZE_US"
      ? "Size US"
      : "Color";

  return (
    <div className="rounded-lg   bg-white">
      <div className="px-4 pt-3 text-sm font-semibold">Variants</div>

      {/* EMPTY STATE */}
      {!editing && values.length === 0 && (
        <div className="px-4 pb-4">
          <button
            onClick={() => setEditing(true)}
            className="w-full h-12 rounded-md bg-gray-100 text-gray-400 flex items-center gap-2 px-4 text-sm"
          >
            ＋ Add options, colors, size etc.
          </button>
        </div>
      )}

      {/* EDIT MODE */}
      {editing && (
        <div className="px-4 pb-4 space-y-4">
          <Field label="Option name">
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value as VariantType);
                setValues([]);
              }}
            >
              <option value="">Select option</option>
              <option value="SIZE_UK">Size UK</option>
              <option value="SIZE_US">Size US</option>
              <option value="COLOR">Color</option>
            </Select>
          </Field>

          {type && (
            <Field label="Option values">
              <div className="flex gap-1.5 mt-1.5 flex-wrap">
                {OPTIONS[type].map((v) => {
                  const active = values.includes(v);
                  return (
                    <button
                      key={v}
                      type="button"
                      onClick={() => toggleValue(v)}
                      className={`w-9 h-9 border rounded text-sm ${
                        active
                          ? "bg-blue-100 text-blue-700 border-blue-300"
                          : "bg-white text-gray-700"
                      }`}
                    >
                      {v}
                    </button>
                  );
                })}
              </div>
            </Field>
          )}

          <div className="flex justify-end gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setEditing(false);
                setValues([]);
                setType("");
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={values.length === 0}
              onClick={() => setEditing(false)}
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* SAVED VIEW */}
      {!editing && values.length > 0 && (
        <>
          <div className="px-4 pb-4 flex justify-between">
            <div>
              <p className="text-sm font-medium">{optionLabel}</p>
              <div className="flex gap-2 mt-2 flex-wrap">
                {values.map((v) => (
                  <span
                    key={v}
                    className="w-9 h-9 border rounded flex items-center justify-center bg-blue-50 text-blue-700 text-sm"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <button onClick={() => setEditing(true)}>✏️</button>
          </div>

          {/* TABLE */}
          <div className="border-t">
            <div className="flex justify-between px-4 py-2 text-[11px] text-gray-400 uppercase">
              <span>Variant</span>
              <Button onClick={() => setBulkEdit(true)}>Bulk Edit</Button>
            </div>

            <table className="w-full text-sm">
              <tbody>
                {rows.map((r) => (
                  <tr key={r.value} className="border-t">
                    <td className="px-4 py-2">{r.value}</td>

                    <td className="px-4 py-2">
                      ₹{r.sellingPrice}
                      <span className="line-through ml-1 text-xs text-gray-400">
                        ₹{r.mrp}
                      </span>
                    </td>

                    <td className="px-4 py-2">
                      <Input
                        type="number"
                        value={r.stock}
                        onChange={(e) =>
                          updateRow(
                            r.value,
                            "stock",
                            Number(e.target.value)
                          )
                        }
                        className="w-20"
                      />
                    </td>

                    <td className="px-4 py-2 text-right">✏️</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* BULK EDIT */}
      {bulkEdit && (
        <div className="p-4 border-t flex justify-end gap-2">
          <Button variant="secondary" onClick={() => setBulkEdit(false)}>
            Cancel
          </Button>
          <Button onClick={applyBulk}>Done</Button>
        </div>
      )}
    </div>
  );
}
