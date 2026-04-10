"use client";

import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function JinStory() {
  const headingRef = useScrollReveal<HTMLDivElement>({ y: 40, duration: 0.8 });
  const bodyRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7, delay: 0.15 });
  const photoRef = useScrollReveal<HTMLDivElement>({ y: 50, duration: 0.9, delay: 0.1 });

  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32 border-t border-white/10">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div ref={headingRef}>
          <SectionLabel>Jin Yoo</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight">
            He built systems for the federal government. Now he builds them <u>especially</u> for those who earn it.
          </h2>
        </div>
        <div ref={bodyRef} className="flex flex-col gap-6 text-base leading-relaxed opacity-70">
          <p>
            Jin spent 15 years in federal product and technology — working inside systems that had to work. You ship something for the federal government, it either works or it doesn't. He learned to build things that hold, and build processes that break through bureaucracy.
          </p>
          <p>
            At Nyoo Studio, he handles strategy, automation, and the infrastructure behind how the work gets done. The systems that make it possible to do great work at speed, without dropping anything.
          </p>
          <p>
            Most clients never see what he builds. That's the point.
          </p>
        </div>
      </div>
      <div ref={photoRef} className="relative mx-auto max-w-[1200px] mt-16">
        <div className="h-80 w-64 overflow-hidden rounded-lg ring-1 ring-white/10 shadow-xl shadow-black/30">
          <Image
            src="/images/JIN_HEADSHOT.jpg"
            alt="Jin Yoo"
            width={256}
            height={320}
            className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
        </div>
      </div>
    </section>
  );
}
