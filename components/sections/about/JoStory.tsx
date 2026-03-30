import { GrainOverlay } from "@/components/ui/GrainOverlay";
import { SectionLabel } from "@/components/ui/SectionLabel";

export function JoStory() {
  return (
    <section className="relative bg-soft-black text-white px-6 py-24 md:py-32">
      <GrainOverlay />
      <div className="relative mx-auto max-w-[1200px] grid md:grid-cols-2 gap-16 md:gap-24 items-start">
        <div>
          <SectionLabel>Johanna Yoo</SectionLabel>
          <h2 className="mt-4 font-title text-4xl md:text-5xl font-bold leading-tight">
            She's spent 12 years building brands. Now she builds them for people who earn it.
          </h2>
        </div>
        <div className="flex flex-col gap-6 text-base leading-relaxed opacity-70">
          <p>
            Jo started her career working inside agencies — the kind with big-name clients and bigger overhead. She got good at reading what makes a brand land. What makes people pay attention. What makes them come back.
          </p>
          <p>
            After a decade-plus supporting national and regional brands, she wanted to work with businesses where the stakes actually meant something to someone. Small businesses. Owners. People who built something real.
          </p>
          <p>
            She runs every client relationship at Nyoo Studio and leads content production. When something goes out under a client's name, Jo has touched it.
          </p>
        </div>
      </div>
      {/* Photo placeholder */}
      <div className="relative mx-auto max-w-[1200px] mt-16">
        <div className="h-80 w-64 bg-white/10 border border-white/15 flex items-center justify-center text-xs opacity-40 tracking-widest uppercase">
          [JO_HEADSHOT]
        </div>
      </div>
    </section>
  );
}
