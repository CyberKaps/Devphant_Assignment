interface VariantTableProps {
  values: string[];
}

export default function VariantTable({ values }: VariantTableProps) {
  return (
    <table className="w-full text-xs border">
      <thead>
        <tr>
          <th>Variant</th>
          <th>MRP</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {values.map(v => (
          <tr key={v}>
            <td>{v}</td>
            <td>₹2160</td>
            <td>100</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
