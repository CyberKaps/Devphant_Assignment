import { Input } from "./ui/Input";
import { Select } from "./ui/Select";

export default function PriceSection({ register, watch }) {
  const mrp = watch("mrp") || 0;
  const offer = watch("offer") || 0;

  const sellingPrice =
    mrp - Math.round((mrp * offer) / 100);

  return (
    <div className=" rounded p-4 grid grid-cols-3 gap-4">
      <Input
        type="number"
        placeholder="MRP"
        {...register("mrp", { valueAsNumber: true })}
      />

      <Select {...register("offer", { valueAsNumber: true })}>
        <option value={0}>0% Off</option>
        <option value={10}>10% Off</option>
        <option value={20}>20% Off</option>
      </Select>

      <Input
        type="number"
        value={sellingPrice}
        readOnly
        {...register("sellingPrice", {
          valueAsNumber: true,
        })}
      />
    </div>
  );
}
