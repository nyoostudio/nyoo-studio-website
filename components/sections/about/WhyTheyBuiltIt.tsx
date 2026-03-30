import { GrainOverlay } from "@/components/ui/GrainOverlay";

export function WhyTheyBuiltIt() {
  return (
    <section className="relative bg-red text-soft-black px-6 py-24 md:py-32">
      <GrainOverlay opacity={0.08} />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <h2 className="font-title text-4xl md:text-6xl font-bold leading-tight">
          27 years of combined experience. One reason they started this.
        </h2>
        <div className="flex flex-col gap-6 text-base leading-relaxed opacity-80">
          <p>
            Between them, Jo and Jin have seen what it looks like when marketing is done right — and what it costs when it isn't. They've watched small businesses get handed generic strategies built for someone else's audience, pay for content that sounds like it came from a template, and wait months to see results that never come.
          </p>
          <p>
            Nyoo Studio exists because they knew it could be done differently. Faster. More honestly. With the kind of attention and craft that most agencies reserve for their biggest clients.
          </p>
          <p>
            They don't take every client. They take the ones they can actually move the needle for — and then they do exactly that.
          </p>
        </div>
      </div>
    </section>
  );
}
