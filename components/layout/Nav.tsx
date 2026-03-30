import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
];

interface NavProps {
  className?: string;
  onLinkClick?: () => void;
}

export function Nav({ className, onLinkClick }: NavProps) {
  return (
    <nav className={cn("flex items-center gap-8", className)}>
      {links.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          onClick={onLinkClick}
          className="text-sm font-bold tracking-wide transition-opacity hover:opacity-60"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
