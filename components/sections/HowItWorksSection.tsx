import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const steps = [
  {
    number: "01",
    title: "Strategy Call",
    description:
      "A 30-minute conversation about your business. We listen more than we talk. No pitch.",
  },
  {
    number: "02",
    title: "Custom Plan",
    description:
      "We build a content brief tailored to your voice, your goals, and your audience. You review it. We adjust.",
  },
  {
    number: "03",
    title: "We Get to Work",
    description:
      "Drafts in your inbox. Captions ready to approve. Calendar filled. You stay focused on running your business.",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel>The process</SectionLabel>
        <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight max-w-2xl">
          No onboarding decks. No 12-week discovery phases.
        </h2>
        <div className="mt-16 grid gap-0 md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`py-10 px-8 ${i !== 0 ? "md:border-l md:border-white/15" : ""} ${i === 0 ? "md:pl-0" : ""} ${i === steps.length - 1 ? "md:pr-0" : ""}`}
            >
              <span className="text-red font-bold text-sm tracking-widest">
                {step.number}
              </span>
              <h3 className="mt-4 font-title text-2xl font-bold">
                {step.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed opacity-70">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
