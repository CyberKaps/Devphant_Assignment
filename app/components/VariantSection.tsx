
import { useVariants } from "../hooks/useVariants";
import { Button } from "./ui/Button";
import { VariantOptionsPanel } from "./VariantOptionPanel";
import { VariantTable } from "./VariantTable";

export default function VariantsSection({
  baseMrp,
  baseOffer,
}: {
  baseMrp: number;
  baseOffer: number;
}) {
  const v = useVariants(baseMrp, baseOffer);

  return (
    <div className="rounded-xl bg-white">
      <div className="p-4 font-semibold">Variants</div>

      <div className="px-4 pb-4">
        <button
          type="button"
          onClick={() => v.setEditingOption(true)}
          className="w-full h-12 rounded-md bg-gray-100 text-gray-400"
        >
          ＋ Add options, colors, size etc.
        </button>
      </div>

      {v.editingOption && (
        <VariantOptionsPanel
          optionType={v.optionType}
          tempValues={v.tempValues}
          setOptionType={v.setOptionType}
          toggleTempValue={v.toggleTempValue}
          onCancel={() => v.setEditingOption(false)}
          onDone={v.commitOption}
        />
      )}

      {v.variantRows.length > 0 && (
        <VariantTable
          rows={v.variantRows}
          bulkEdit={v.bulkEdit}
          editingRow={v.editingRow}
          onEditRow={(key) =>
            v.setEditingRow(v.editingRow === key ? null : key)
          }
          onChange={v.updateRow}
          onBulkEdit={() => v.setBulkEdit(true)}
        />
      )}

      {v.bulkEdit && (
  <div className="flex justify-end items-center gap-3 px-4 py-3 border-t border-gray-200 bg-white">
    <Button
      type="button"
      variant="secondary"
      onClick={() => {
        v.setBulkEdit(false);
        v.setEditingRow(null);
      }}
    >
      Cancel
    </Button>

    <Button
      type="button"
      onClick={() => {
        // values already updated live
        v.setBulkEdit(false);
        v.setEditingRow(null);
      }}
    >
      Done
    </Button>
  </div>
)}
    </div>
  );
}
