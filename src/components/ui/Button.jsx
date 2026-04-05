export function Button({
  children,
  className = "",
  variant = "primary",
  as = "button",
  ...props
}) {
  const Tag = as;
  const base =
    "inline-flex items-center justify-center font-sans text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2";

  const variants = {
    primary:
      "bg-white text-neutral-900 px-8 py-3.5 hover:bg-neutral-100 border border-transparent",
    inverse:
      "bg-neutral-900 text-white px-8 py-3.5 hover:bg-neutral-800 border border-neutral-900",
    outline:
      "border border-neutral-900 text-neutral-900 bg-transparent px-8 py-3.5 hover:bg-neutral-900 hover:text-white",
    ghost: "text-neutral-900 underline-offset-4 hover:underline px-2 py-2",
  };

  return (
    <Tag
      className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
