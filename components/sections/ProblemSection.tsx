import { SectionLabel } from "@/components/ui/SectionLabel";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const symptoms = [
  {
    heading: "You post when there's time.",
    body: "There's never time. So nothing builds, nothing compounds, and the algorithm moves on without you.",
  },
  {
    heading: "You've tried things.",
    body: "A boosted post. A rebrand. A content push that lasted two weeks. Nothing wrong with the effort — the problem was the system.",
  },
  {
    heading: "Your customers know you're good.",
    body: "Strangers don't. And strangers are the ones you need to reach. Referrals keep the lights on. They don't grow the business.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px]">
        <SectionLabel>The gap</SectionLabel>
        <h2 className="mt-4 font-title text-4xl md:text-6xl font-bold leading-tight max-w-3xl">
          Most small businesses don't have a marketing problem. They have a visibility problem.
        </h2>
        <p className="mt-8 text-lg leading-relaxed opacity-90 max-w-2xl">
          The businesses outranking you aren't better. They&apos;re just more visible.
        </p>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
          {symptoms.map(({ heading, body }) => (
            <div key={heading} className="px-8 py-8 md:py-0 first:md:pl-0 last:md:pr-0">
              <p className="font-title text-2xl font-bold leading-snug">{heading}</p>
              <p className="mt-3 text-base leading-relaxed opacity-60">{body}</p>
            </div>
          ))}
        </div>

        {/* <div className="mt-16 max-w-2xl">
          <p className="text-lg leading-relaxed opacity-70">
            That's the gap. And it's not a talent problem — it's a system problem.
          </p>
          <p className="mt-3 flex items-center gap-3 text-sm font-semibold tracking-widest uppercase text-amber">
            Here's how we fix it
            <span className="inline-block h-px w-12 bg-amber/40" />
          </p>
        </div> */}
      </div>
    </section>
  );
}
