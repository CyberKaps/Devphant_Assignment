export function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
