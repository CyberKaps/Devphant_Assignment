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
      className={`px-4 py-2 rounded text-sm ${
        variant === "primary"
          ? "bg-black text-white"
          : "border"
      }`}
    >
      {children}
    </button>
  );
}
