import { OPTIONS } from "../constants";
import { VariantType } from "../types";
import { Button } from "./ui/Button";
import { Field } from "./ui/Field";
import { Select } from "./ui/Select";


interface Props {
  optionType: VariantType | "";
  tempValues: string[];
  setOptionType: (v: VariantType | "") => void;
  toggleTempValue: (v: string) => void;
  onCancel: () => void;
  onDone: () => void;
}

export function VariantOptionsPanel({
  optionType,
  tempValues,
  setOptionType,
  toggleTempValue,
  onCancel,
  onDone,
}: Props) {
  return (
    <div className="px-4 pb-4 space-y-4">
      <Field label="Option name">
        <Select
          value={optionType}
          onChange={(e) => setOptionType(e.target.value as VariantType)}
        >
          <option value="">Select option</option>
          <option value="SIZE_UK">Size UK</option>
          <option value="SIZE_US">Size US</option>
          <option value="COLOR">Color</option>
        </Select>
      </Field>

      {optionType && (
        <div className="flex gap-2 flex-wrap">
          {OPTIONS[optionType].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => toggleTempValue(v)}
              className={`px-3 py-2 border rounded ${
                tempValues.includes(v)
                  ? "bg-blue-100 text-blue-700"
                  : ""
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" onClick={onDone} disabled={!tempValues.length}>
          Done
        </Button>
      </div>
    </div>
  );
}
