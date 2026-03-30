import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { PricingTiers } from "@/components/sections/services/PricingTiers";
import { CommitDiscounts } from "@/components/sections/services/CommitDiscounts";
import { AddOns } from "@/components/sections/services/AddOns";
import { ReferralDiscounts } from "@/components/sections/services/ReferralDiscounts";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Marketing Packages & Pricing | Nyoo Studio | DC Metro Small Business Marketing",
  description:
    "Nyoo Studio offers social media management and content strategy packages for established small businesses in DC, Virginia, and Maryland. See what's included and book a free call.",
  alternates: {
    canonical: "https://nyoostudio.com/services",
  },
  openGraph: {
    title: "Marketing Packages & Pricing | Nyoo Studio",
    description:
      "Social media management and content strategy packages for established DC Metro small businesses.",
    url: "https://nyoostudio.com/services",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Social Media Management & Content Strategy",
  provider: {
    "@type": "LocalBusiness",
    name: "Nyoo Studio",
    url: "https://nyoostudio.com",
    address: {
      "@type": "PostalAddress",
      addressRegion: "DC Metro",
      addressCountry: "US",
    },
  },
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 38.9072,
      longitude: -77.0369,
    },
    geoRadius: "80000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Nyoo Studio Packages",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Foundation",
        },
        price: "1299",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Growth Engine",
        },
        price: "2499",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scale",
        },
        price: "3499",
        priceCurrency: "USD",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          billingDuration: "P1M",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Hero
        gradient={true}
        headline="What we do. What it costs. No surprises."
        subhead="Two services. Three tiers. Everything laid out so you can make the right call before we even get on the phone."
      />
      <PricingTiers />
      <CommitDiscounts />
      <AddOns />
      <ReferralDiscounts />
      <CTASection
        headline="Not sure which tier is right for you?"
        ctaLabel="Book a Free Strategy Call"
      />
    </>
  );
}
