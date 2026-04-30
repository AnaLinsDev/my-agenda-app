import clsx from "clsx";

type Props = {
  label: string;
  errorMessage?: string | undefined;
  variant?: "default" | "error" | "success";
  sizeInput?: "sm" | "md" | "lg";
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

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

export default function Input({
  label,
  errorMessage,
  variant = "default",
  sizeInput = "md",
  className,
  ...props
}: Props) {
  return (
    <div>
      <label>{label}</label>
      <input
        className={clsx(
          "w-full rounded-xl bg-whitesmoke outline-none transition placeholder:text-text disabled:opacity-50",
          variants[variant],
          sizes[sizeInput],
          className,
        )}
        {...props}
      />
      <p className="text-error">{errorMessage}</p>
    </div>
  );
}
