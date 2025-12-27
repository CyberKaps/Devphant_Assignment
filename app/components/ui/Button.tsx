export function Button({
  children,
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-2 py-2 rounded-full text-sm font-medium ${
        variant === "primary"
          ? "bg-gradient-to-r from-red-600 to-red-800 text-white"
          : "border border-gray-300 text-gray-700 bg-white"
      }`}
    >
      {children}
    </button>
  );
}
