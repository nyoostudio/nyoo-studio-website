import Image from "next/image";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const services = [
  {
    title: "Social Media Management",
    description:
      "Consistent presence across the platforms where your customers already are. Content calendar, captions, scheduling, and community management — handled.",
  },
  {
    title: "Content Strategy for Lead Generation",
    description:
      "A messaging framework built around what makes your business different, and a content system designed to turn attention into inquiries.",
  },
  {
    title: "Systems & Workflows",
    description:
      "The backend infrastructure that lets your business grow without growing your workload. Intake workflows, automated reporting, and content pipelines — built once, running always.",
  },
];

export function WhatWeDoSection() {
  return (
    <section className="relative text-white px-6 py-24 md:py-32 overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/night-street-bokeh.png"
        alt=""
        fill
        className="object-cover object-center"
        priority={false}
        aria-hidden="true"
      />
      {/* Dark overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/80" />
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel>The Solution</SectionLabel>
        <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight">
          Growth done well.
        </h2>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="border border-white/15 p-10 flex flex-col gap-4 bg-black/100"
            >
              {/* <span className="text-red font-bold text-sm tracking-widest uppercase">
                →
              </span> */}
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
