"use client";

import Link from "next/link";
import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

const founders = [
  {
    name: "Jo Yoo",
    bio: "Jo spent 12 years supporting brand growth for national and regional clients before co-founding Nyoo Studio. She runs every client relationship and leads content production.",
    photo: "/images/JO_HEADSHOT.jpg",
  },
  {
    name: "Jin Yoo",
    bio: "Jin launched products for the federal government and built the systems that power how we work. He handles business strategy, automation, and everything that runs in the background.",
    photo: "/images/JIN_HEADSHOT.jpg",
  },
];

export function FoundersTeaser() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const bgParallax = useParallax<HTMLDivElement>({ speed: 0.2 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.2,
    y: 50,
    duration: 0.7,
  });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Parallax background orb */}
      <div ref={bgParallax} className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="orb orb-purple w-[450px] h-[450px] top-1/4 -right-32 opacity-30" />
      </div>
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>The Team</SectionLabel>
          <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight">
            Meet the team.
          </h2>
        </div>
        <div ref={cardsRef} className="mt-16 grid gap-8 md:grid-cols-2">
          {founders.map((founder) => (
            <div key={founder.name} className="glass-card p-8 flex flex-col gap-6 group">
              <div className="h-48 w-48 overflow-hidden rounded-lg ring-1 ring-white/10 transition-all duration-500 group-hover:ring-white/20 group-hover:shadow-xl group-hover:shadow-black/30">
                <Image
                  src={founder.photo}
                  alt={founder.name}
                  width={192}
                  height={192}
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-title text-2xl font-bold">{founder.name}</h3>
              <p className="text-base leading-relaxed opacity-70">{founder.bio}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center gap-2 font-bold text-base transition-all duration-300 hover:opacity-60 hover:gap-3 group"
        >
          Read our story <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}
