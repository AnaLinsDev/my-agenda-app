import clsx from "clsx";

type Props = {
  label: string;
  variant?: "default" | "error" | "success";
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const variants = {
  default:
    "border-[var(--border)] checked:bg-[var(--accent)] checked:border-[var(--accent)]",
  error: "border-red-500 checked:bg-red-500 checked:border-red-500",
  success: "border-green-500 checked:bg-green-500 checked:border-green-500",
} as const;

export default function Checkbox({
  label,
  variant = "default",
  className,
  ...props
}: Props) {
  return (
    <label className="flex items-center gap-2 cursor-pointer mt-5">
      <input
        type="checkbox"
        className={clsx(
          "h-4 w-4 rounded bg-white border appearance-none flex items-center justify-center transition",
          "checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:flex checked:after:items-center checked:after:justify-center",
          variants[variant],
          className,
        )}
        {...props}
      />
      <span className="text-sm">{label}</span>
    </label>
  );
}
