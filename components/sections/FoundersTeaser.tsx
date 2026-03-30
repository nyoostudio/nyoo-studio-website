import Link from "next/link";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const founders = [
  {
    name: "Jo Yoo",
    bio: "Jo spent 12 years supporting brand growth for national and regional clients before co-founding Nyoo Studio. She runs every client relationship and leads content production.",
    photo: "[JO_HEADSHOT]",
  },
  {
    name: "Jin Yoo",
    bio: "Jin launched products for the federal government and built the systems that power how we work. He handles business strategy, automation, and everything that runs in the background.",
    photo: "[JIN_HEADSHOT]",
  },
];

export function FoundersTeaser() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight">
          Not a faceless agency.
        </h2>
        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {founders.map((founder) => (
            <div key={founder.name} className="flex flex-col gap-4">
              <div className="h-48 w-48 bg-white/10 border border-white/15 flex items-center justify-center text-xs opacity-40 tracking-widest uppercase">
                {founder.photo}
              </div>
              <h3 className="font-title text-2xl font-bold">{founder.name}</h3>
              <p className="text-base leading-relaxed opacity-70">{founder.bio}</p>
            </div>
          ))}
        </div>
        <Link
          href="/about"
          className="mt-12 inline-flex items-center gap-2 font-bold text-base transition-opacity hover:opacity-60"
        >
          Read our story <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
