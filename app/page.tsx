import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { WhatWeDoSection } from "@/components/sections/WhatWeDoSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SocialProofSection } from "@/components/sections/SocialProofSection";
import { FoundersTeaser } from "@/components/sections/FoundersTeaser";
import { FAQTeaser } from "@/components/sections/FAQTeaser";
import { CTASection } from "@/components/sections/CTASection";

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
      <Hero
        gradient={true}
        headline="Your social media should be bringing in clients. Not just followers."
        subhead="Nyoo Studio builds social media systems that generate qualified leads for established small businesses in DC Metro. Not vanity metrics. Not vague brand awareness. Leads."
        cta={
          <>
            <Link
              href="/book"
              className="inline-flex items-center justify-center bg-red text-white px-8 py-4 text-base font-bold tracking-wide transition-colors hover:bg-red/90"
            >
              Book Your Strategy Call
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center border border-white bg-transparent text-white px-8 py-4 text-base font-bold tracking-wide transition-colors hover:bg-white/10"
            >
              See How It Works
            </Link>
          </>
        }
      />
      <ProblemSection />
      <WhatWeDoSection />
      <HowItWorksSection />
      <SocialProofSection />
      <FoundersTeaser />
      <FAQTeaser />
      <CTASection
        variant="transparent"
        headline="Ready to know exactly where your next client is coming from?"
        ctaLabel="Book Your Strategy Call"
      />
    </>
  );
}
