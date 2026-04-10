"use client";

import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { useParallax } from "@/lib/useParallax";

const services = [
  {
    title: "Lead-First Content Strategy",
    description:
      "We map your content to your sales cycle. Every post, caption, and video is built to attract prospects who are already looking for what you offer — and give them a clear next step. This isn't content for content's sake. It's content with a destination.",
  },
  {
    title: "Social Media That Converts",
    description:
      "Consistent, high-quality presence across the platforms where your customers already spend time. Content calendar, captions, scheduling, community management — all handled, all tied back to lead generation goals. We track what drives inquiries, not just what gets likes.",
  },
  {
    title: "Lead Qualification & Pipeline Infrastructure",
    description:
      "The backend systems that capture, qualify, and route leads from social media into your business. Automated DM flows, intake workflows, lead scoring, and reporting that shows you exactly where your clients are coming from. Built once, running always.",
  },
];

export function WhatWeDoSection() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const cardsRef = useScrollReveal<HTMLDivElement>({
    staggerChildren: true,
    stagger: 0.15,
    y: 50,
    duration: 0.7,
  });
  const bgRef = useParallax<HTMLDivElement>({ speed: 0.3 });

  return (
    <section className="relative text-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Background image with parallax */}
      <div ref={bgRef} className="absolute inset-0" aria-hidden>
        <Image
          src="/images/night-street-bokeh.png"
          alt=""
          fill
          className="object-cover object-center scale-110"
          priority={false}
          aria-hidden="true"
        />
      </div>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80" />
      <GrainOverlay />

      <div className="relative mx-auto max-w-[1200px]">
        <div ref={headingRef}>
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight">
            Social media that works like a sales channel. Because it is one.
          </h2>
          <p className="mt-6 text-lg leading-relaxed opacity-70 max-w-2xl">
            Everything we build is designed around one outcome: turning your social media presence into a reliable source of qualified leads. We don&apos;t post for the sake of posting. Every piece of content has a job — attract the right people, qualify their interest, and move them toward becoming your client.
          </p>
        </div>
        <div ref={cardsRef} className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="glass-card p-10 flex flex-col gap-4"
            >
              <h3 className="font-title text-2xl md:text-3xl font-bold leading-snug">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed opacity-70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
