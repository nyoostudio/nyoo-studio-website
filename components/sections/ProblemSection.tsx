import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function ProblemSection() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel>The gap</SectionLabel>
        <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Most small businesses don't have a marketing problem. They have a visibility problem.
        </h2>
        <p className="mt-8 text-lg leading-relaxed opacity-70 max-w-2xl">
          Your work is good. Your customers know it. But the people who haven't found you yet? They're still choosing someone else.
        </p>
      </div>
    </section>
  );
}
