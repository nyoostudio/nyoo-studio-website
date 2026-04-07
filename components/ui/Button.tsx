import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "ghost" | "nav";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-bold tracking-wide transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-red text-white px-8 py-4 text-base hover:bg-red/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20 focus-visible:ring-red active:translate-y-0",
    ghost:
      "border border-current bg-transparent px-8 py-4 text-base hover:bg-white/10 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-white/5 focus-visible:ring-current active:translate-y-0",
    nav: "bg-red text-white px-5 py-2 text-sm hover:bg-red/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-red/20 focus-visible:ring-red active:translate-y-0",
  };

  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  );
}
