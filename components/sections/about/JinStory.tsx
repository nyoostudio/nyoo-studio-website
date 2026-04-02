import Image from "next/image";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function JinStory() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32 border-t border-white/10">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <SectionLabel>Jin Yoo</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight">
            He's launched products for the federal government. Nyoo Studio runs on what he built.
          </h2>
        </div>
        <div className="flex flex-col gap-6 text-base leading-relaxed opacity-70">
          <p>
            Jin spent years in product and technology — working inside systems that had to work. No room for "good enough." You ship something for the federal government, it either works or it doesn't. He learned to build things that hold.
          </p>
          <p>
            At Nyoo Studio, he handles strategy, automation, and the infrastructure behind how the work gets done. The systems that make it possible to do great work at speed, without dropping anything.
          </p>
          <p>
            Most clients never see what he builds. That's the point.
          </p>
        </div>
      </div>
      <div className="relative mx-auto max-w-[1200px] mt-16">
        <div className="h-80 w-64 overflow-hidden">
          <Image
            src="/images/JIN_HEADSHOT.jpg"
            alt="Jin Yoo"
            width={256}
            height={320}
            className="h-full w-full object-cover object-top"
          />
        </div>
      </div>
    </section>
  );
}
