"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";

const founders = [
  {
    name: "Jo Yoo",
    role: "Client Relations & Content",
    number: "01",
    photo: "/images/JO_HEADSHOT.jpg",
  },
  {
    name: "Jin Yoo",
    role: "Strategy & Systems",
    number: "02",
    photo: "/images/JIN_HEADSHOT.jpg",
  },
];

export function FoundersTeaser() {
  const photosRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.12,
    y: 24,
    duration: 0.65,
    start: "top 80%",
  });

  return (
    <section
      className="relative overflow-hidden"
      style={{
        padding: `clamp(60px, 10vw, 140px) var(--px)`,
        background: "var(--black)",
        position: "relative",
        zIndex: 2,
      }}
    >
      {/* Header row: headline + link */}
      <div
        className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-baseline"
        style={{
          marginBottom: "clamp(36px, 6vw, 64px)",
          borderBottom: "1px solid var(--rule)",
          paddingBottom: "clamp(28px, 4vw, 48px)",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(36px, 7.5vw, 110px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--cream)",
          }}
        >
          Not a<br />faceless<br />agency.
        </h2>
        <Link
          href="/about"
          className="flex items-center gap-2 self-end transition-colors whitespace-nowrap"
          style={{ fontSize: "12px", fontWeight: 700, color: "var(--muted)", letterSpacing: "0.06em" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--cream)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          Read our story{" "}
          <span style={{ color: "var(--amber)" }}>→</span>
        </Link>
      </div>

      {/* Edge-to-edge photo grid — negative margin removes section padding */}
      <div
        ref={photosRef}
        className="grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(8px, 1.5vw, 16px)",
          maxWidth: "960px",
          margin: "0 auto",
        }}
      >
        {founders.map(({ name, role, number, photo }) => (
          <div
            key={name}
            className="relative overflow-hidden group"
            style={{ aspectRatio: "3/4", background: "#111" }}
            onMouseEnter={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(0%)";
            }}
            onMouseLeave={(e) => {
              const img = e.currentTarget.querySelector("img");
              if (img) img.style.filter = "grayscale(25%)";
            }}
          >
            <Image
              src={photo}
              alt={name}
              fill
              className="object-cover object-top transition-all duration-500 group-hover:scale-[1.04]"
              style={{ filter: "grayscale(25%)" }}
              sizes="(max-width: 768px) 75vw, 600px"
            />
            {/* Caption overlay */}
            <div
              className="absolute bottom-0 left-0 right-0 flex justify-between items-end"
              style={{
                padding: "clamp(20px, 4vw, 40px)",
                background: "linear-gradient(to top, rgba(8,8,8,0.92) 0%, transparent 100%)",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "clamp(18px, 3vw, 36px)",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    color: "var(--cream, #F0EBE1)",
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--amber)",
                    marginTop: "4px",
                  }}
                >
                  {role}
                </p>
              </div>
              <span
                aria-hidden
                style={{
                  fontSize: "clamp(22px, 3.5vw, 40px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  color: "rgba(240,235,225,0.18)",
                  lineHeight: 1,
                }}
              >
                {number}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
