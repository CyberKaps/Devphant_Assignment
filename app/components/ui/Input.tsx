export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-md bg-gray-50 border border-gray-200 px-3 py-2 text-sm
                 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
    />
  );
}
