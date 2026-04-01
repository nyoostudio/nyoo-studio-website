"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-soft-black text-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src="/images/nyoo logo type horizontal white cropped.png"
            alt="Nyoo Studio"
            width={150}
            height={150}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <Nav className="hidden md:flex" />

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/book"
            className="inline-flex items-center justify-center bg-red px-5 py-2 text-sm font-bold tracking-wide text-white transition-colors hover:bg-red/90"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-opacity duration-200 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-transform duration-200 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 bg-soft-black px-6 py-8 flex flex-col gap-6">
          <Nav
            className="flex-col items-start gap-6"
            onLinkClick={() => setMenuOpen(false)}
          />
          <Link
            href="/book"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center justify-center bg-red px-5 py-2 text-sm font-bold tracking-wide text-white transition-colors hover:bg-red/90"
          >
            Book a Call
          </Link>
        </div>
      )}
    </header>
  );
}
