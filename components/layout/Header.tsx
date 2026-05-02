"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Nav } from "./Nav";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] bg-soft-black/[0.88] text-white"
      style={{ backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--rule)" }}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="hover:opacity-80 transition-opacity duration-300">
          <Image
            src="/images/nyoo logo type horizontal white cropped.png"
            alt="Nyoo Studio"
            width={150}
            height={150}
            priority
            className="transition-opacity duration-300"
          />
        </Link>

        {/* Desktop nav */}
        <Nav className="hidden md:flex" aria-label="Primary" />

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/audit"
            className="inline-flex items-center justify-center bg-red px-5 py-2 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red/90 hover:shadow-lg hover:shadow-red/20 hover:-translate-y-0.5"
          >
            Start Audit
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-1"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${menuOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${menuOpen ? "opacity-0 scale-x-0" : ""
              }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ease-out ${menuOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className="md:hidden grid"
        style={{
          gridTemplateRows: menuOpen ? "1fr" : "0fr",
          opacity: menuOpen ? 1 : 0,
          transition: "grid-template-rows 0.4s ease-out, opacity 0.4s ease-out",
        }}
        aria-hidden={!menuOpen}
        {...(!menuOpen ? { inert: true } : {})}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/10 bg-soft-black/90 backdrop-blur-xl px-6 py-8 flex flex-col gap-6">
            <Nav
              className="flex-col items-start gap-6"
              aria-label="Mobile"
              onLinkClick={closeMenu}
            />
            <Link
              href="/audit"
              onClick={closeMenu}
              className="inline-flex items-center justify-center bg-red px-5 py-2 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:bg-red/90 hover:shadow-lg hover:shadow-red/20"
            >
              Start Audit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
