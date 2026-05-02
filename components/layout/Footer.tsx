"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/lib/useScrollReveal";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  const ref = useScrollReveal<HTMLElement>({ y: 30, duration: 0.6 });

  return (
    <footer
      ref={ref}
      className="relative bg-soft-black text-white border-t border-white/10 overflow-hidden"
    >
      {/* Subtle radial glow */}
      <div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[200px] orb orb-cobalt opacity-30"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1200px] px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Logo */}
          <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/images/nyoo-logo-horizontal-white.png"
              alt="Nyoo Studio"
              width={140}
              height={40}
              style={{ width: "140px", height: "auto" }}
            />
          </Link>

          {/* Nav */}
          <nav aria-label="Footer" className="flex flex-wrap gap-6">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="py-2 text-sm font-bold tracking-wide transition-all duration-300 hover:opacity-60 hover:-translate-y-0.5"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:hello@nyoostudio.com"
            className="text-sm transition-all duration-300 hover:opacity-60 hover:text-red"
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
