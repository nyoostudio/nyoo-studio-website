import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-soft-black text-white border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image
              src="/images/nyoo studio logo white.png"
              alt="Nyoo Studio"
              width={36}
              height={36}
            />
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-bold tracking-wide transition-opacity hover:opacity-60"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:hello@nyoostudio.com"
            className="text-sm transition-opacity hover:opacity-60"
          >
            hello@nyoostudio.com
          </a>
        </div>

        <p className="mt-10 text-xs opacity-40">
          © {new Date().getFullYear()} Nyoo Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
