import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { JoStory } from "@/components/sections/about/JoStory";
import { JinStory } from "@/components/sections/about/JinStory";
import { WhyTheyBuiltIt } from "@/components/sections/about/WhyTheyBuiltIt";
import { Values } from "@/components/sections/about/Values";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Nyoo Studio | Jin & Jo Yoo | DC Metro Creative Marketing Agency",
  description:
    "Meet Jin and Jo Yoo, the founders of Nyoo Studio — a DC-area creative marketing agency built for small businesses that deserve better than small thinking.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        headline="We built Nyoo Studio because social media should generate revenue — and most agencies treat it like a posting schedule."
        subhead="We're Jin and Jo Yoo. We started this agency because we saw too many good businesses paying for marketing that couldn't prove its own value."
      />
      <JoStory />
      <JinStory />
      <WhyTheyBuiltIt />
      <Values />
      <CTASection
        headline="Ready to work with people who are all in?"
        ctaLabel="Book a Free Strategy Call"
      />
    </>
  );
}
