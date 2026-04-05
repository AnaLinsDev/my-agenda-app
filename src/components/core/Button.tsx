import clsx from "clsx";

type Props = {
  title: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variants = {
  primary: "bg-[var(--accent)] text-white hover:opacity-90",
  secondary: "bg-[var(--border)] text-[var(--text-h)] hover:bg-opacity-80",
  ghost: "bg-transparent text-[var(--text-h)] hover:bg-[var(--accent-bg)]",
  danger: "bg-red-500 text-white hover:bg-red-600",
};

const sizes = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  title,
  variant = "primary",
  size = "md",
  className,
  ...props
}: Props) {
  return (
    <button
      className={clsx(
        "rounded-xl font-medium transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {title}
    </button>
  );
}
