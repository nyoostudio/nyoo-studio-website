import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <span className="h-px w-8 bg-red/60" aria-hidden />
      <p className="font-subtitle text-sm italic tracking-widest uppercase opacity-60">
        {children}
      </p>
    </div>
  );
}
