import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "font-subtitle text-sm italic tracking-widest uppercase opacity-60",
        className
      )}
    >
      {children}
    </p>
  );
}
