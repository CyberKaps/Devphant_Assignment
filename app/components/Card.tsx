export function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
      {title && (
        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
