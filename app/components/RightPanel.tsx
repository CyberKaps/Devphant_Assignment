import { Field } from "./ui/Field";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";


export default function RightPanel({ register }) {
  return (
    <div className="space-y-4">
      {/* <h3 className="text-sm font-medium">Product Organization</h3> */}

      <Field label="Brand">
        <Input {...register("brand")} />
      </Field>

      <Field label="Warranty">
        <Select {...register("warranty")}>
          <option>6 Months</option>
          <option>12 Months</option>
        </Select>
      </Field>

      <Field label="Seller">
        <Input {...register("seller")} />
      </Field>

      <Field label="Stock">
        <Input type="number" {...register("stock")} />
      </Field>
    </div>
  );
}
