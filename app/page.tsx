import type { Metadata } from "next";
import { HeroHome } from "@/components/sections/HeroHome";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FoundersTeaser } from "@/components/sections/FoundersTeaser";
import { FAQTeaser } from "@/components/sections/FAQTeaser";
import { CTASectionHome } from "@/components/sections/CTASectionHome";

export const metadata: Metadata = {
  title: "Nyoo Studio | Social Media & Content Marketing for Small Businesses | DC Metro",
  description:
    "Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
  alternates: {
    canonical: "https://nyoostudio.com",
  },
  openGraph: {
    title: "Nyoo Studio | Social Media & Content Marketing | DC Metro",
    description:
      "Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
    url: "https://nyoostudio.com",
  },
};

export default function HomePage() {
  return (
    <>
      {/* Fixed underlay — renders visually behind all sections (z-index: 1) */}
      <CTASectionHome />

      {/* Sections scroll over the fixed CTA (all have z-index: 2, position: relative) */}
      <HeroHome />
      <ProblemSection />
      <WhatWeDoSection />
      <SocialProofSection />
      <FoundersTeaser />
      <HowItWorksSection />
      <FAQTeaser />

      {/* Transparent spacer — when this enters viewport, the CTA is revealed */}
      <div
        id="cta-spacer"
        aria-hidden
        style={{
          height: "100svh",
          position: "relative",
          zIndex: 2,
          background: "transparent",
          pointerEvents: "none",
        }}
      />
    </>
  );
}
