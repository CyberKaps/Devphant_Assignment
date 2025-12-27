import { useEffect, useState } from "react";
import { VariantRow, VariantType } from "../types";


export function useVariants(baseMrp: number, baseOffer: number) {
  const [editingOption, setEditingOption] = useState(false);
  const [bulkEdit, setBulkEdit] = useState(false);
  const [editingRow, setEditingRow] = useState<string | null>(null);

  const [optionType, setOptionType] = useState<VariantType | "">("");
  const [tempValues, setTempValues] = useState<string[]>([]);

  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);

  const [variantRows, setVariantRows] = useState<VariantRow[]>([]);

  function calcSelling(mrp: number, offer: number) {
    return Math.round(mrp - (mrp * offer) / 100);
  }

  useEffect(() => {
    if (!sizes.length && !colors.length) {
      setVariantRows([]);
      return;
    }

    const selling = calcSelling(baseMrp || 0, baseOffer || 0);
    const rows: VariantRow[] = [];

    if (sizes.length && colors.length) {
      sizes.forEach((s) =>
        colors.forEach((c) =>
          rows.push({
            key: `${s}-${c}`,
            label: `${s} / ${c}`,
            mrp: baseMrp,
            offer: baseOffer,
            selling,
            stock: 100,
            weight: 0.5,
          })
        )
      );
    } else {
      (sizes.length ? sizes : colors).forEach((v) =>
        rows.push({
          key: v,
          label: v,
          mrp: baseMrp,
          offer: baseOffer,
          selling,
          stock: 100,
          weight: 0.5,
        })
      );
    }

    setVariantRows(rows);
  }, [sizes, colors, baseMrp, baseOffer]);

  function toggleTempValue(v: string) {
    setTempValues((prev) =>
      prev.includes(v) ? prev.filter((x) => x !== v) : [...prev, v]
    );
  }

  function commitOption() {
    if (optionType.includes("SIZE")) setSizes(tempValues);
    if (optionType === "COLOR") setColors(tempValues);

    setEditingOption(false);
    setTempValues([]);
    setOptionType("");
  }

  function updateRow(key: string, field: keyof VariantRow, value: number) {
    setVariantRows((prev) =>
      prev.map((r) =>
        r.key === key
          ? {
              ...r,
              [field]: value,
              selling:
                field === "mrp" || field === "offer"
                  ? calcSelling(
                      field === "mrp" ? value : r.mrp,
                      field === "offer" ? value : r.offer
                    )
                  : r.selling,
            }
          : r
      )
    );
  }

  function applyBulk(field: keyof VariantRow, value: number) {
    setVariantRows((prev) =>
      prev.map((r) => ({
        ...r,
        [field]: value,
        selling:
          field === "mrp" || field === "offer"
            ? calcSelling(
                field === "mrp" ? value : r.mrp,
                field === "offer" ? value : r.offer
              )
            : r.selling,
      }))
    );
  }

  return {
    // state
    variantRows,
    editingOption,
    bulkEdit,
    editingRow,
    optionType,
    tempValues,

    // setters
    setEditingOption,
    setBulkEdit,
    setEditingRow,
    setOptionType,
    setTempValues,

    // actions
    toggleTempValue,
    commitOption,
    updateRow,
    applyBulk,
  };
}
