export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nyoo Studio",
    url: "https://nyoostudio.com",
    email: "hello@nyoostudio.com",
    description:
      "DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: "Washington, DC",
      },
      {
        "@type": "AdministrativeArea",
        name: "Northern Virginia",
      },
      {
        "@type": "AdministrativeArea",
        name: "Maryland",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressRegion: "DC",
      addressCountry: "US",
    },
    knowsAbout: [
      "Social Media Management",
      "Content Strategy",
      "Lead Generation Marketing",
      "Small Business Marketing",
      "Digital Marketing",
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
