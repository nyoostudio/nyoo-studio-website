import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
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
          className="relative text-sm font-bold tracking-wide transition-all duration-300 hover:opacity-80 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-red after:transition-all after:duration-300 hover:after:w-full"
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
