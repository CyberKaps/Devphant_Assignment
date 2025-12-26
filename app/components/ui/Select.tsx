export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-md bg-gray-100 border border-gray-200 px-3 py-2 text-sm
                 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}
