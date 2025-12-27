import { VariantRow } from "../types";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";


interface Props {
  rows: VariantRow[];
  bulkEdit: boolean;
  editingRow: string | null;
  onEditRow: (key: string) => void;
  onChange: (key: string, field: keyof VariantRow, value: number) => void;
  onBulkEdit: () => void;
}

export function VariantTable({
  rows,
  bulkEdit,
  editingRow,
  onEditRow,
  onChange,
  onBulkEdit,
}: Props) {
  return (
    <>
      <div className="hidden md:grid grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr_80px] px-4 py-2 text-xs text-gray-400 border-t">
        <span>Variant</span>
        <span>MRP</span>
        <span>Offer</span>
        <span>Selling</span>
        <span>Inventory</span>
        <span>Weight</span>
        <Button type="button" onClick={onBulkEdit}>
          Bulk Edit
        </Button>
      </div>

      {rows.map((r) => (
        <div
          key={r.key}
          className="grid md:grid-cols-[1.2fr_1fr_1fr_1fr_1fr_1fr_80px] gap-2 px-4 py-2 border-t border-gray-200 "
        >
          <div className="font-medium">{r.label}</div>

          <Input
            type="number"
            value={r.mrp}
            disabled={!bulkEdit && editingRow !== r.key}
            onChange={(e) => onChange(r.key, "mrp", +e.target.value)}
          />

          <Select
            value={r.offer}
            disabled={!bulkEdit && editingRow !== r.key}
            onChange={(e) => onChange(r.key, "offer", +e.target.value)}
          >
            <option value={0}>0%</option>
            <option value={10}>10%</option>
            <option value={20}>20%</option>
          </Select>

          <Input type="number" value={r.selling} disabled />

          <Input
            type="number"
            value={r.stock}
            disabled={!bulkEdit && editingRow !== r.key}
            onChange={(e) => onChange(r.key, "stock", +e.target.value)}
          />

          <Input
            type="number"
            value={r.weight}
            disabled={!bulkEdit && editingRow !== r.key}
            onChange={(e) => onChange(r.key, "weight", +e.target.value)}
          />

          <button
            type="button"
            disabled={bulkEdit}
            onClick={() => onEditRow(r.key)}
          >
            {editingRow === r.key ? "✔" : "✏️"}
          </button>
        </div>
      ))}
    </>
  );
}
