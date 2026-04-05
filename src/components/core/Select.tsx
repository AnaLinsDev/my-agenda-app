import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type Props = {
  label: string;
  options: Option[];
  variant?: "default" | "error" | "success";
  sizeInput?: "sm" | "md" | "lg";
  className?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const variants = {
  default:
    "border border-[var(--border)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-bg)]",
  error:
    "border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200",
  success:
    "border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-200",
} as const;

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
} as const;

export default function Select({
  label,
  options,
  variant = "default",
  sizeInput = "md",
  className,
  ...props
}: Props) {
  return (
    <div className="flex flex-col gap-1 min-w-50">
      <label className="text-sm">{label}</label>

      <select
        className={clsx(
          "w-full rounded-xl bg-white outline-none transition disabled:opacity-50 pr-10",
          variants[variant],
          sizes[sizeInput],
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
