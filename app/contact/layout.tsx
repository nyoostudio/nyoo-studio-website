import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | Nyoo Studio | DC Metro Marketing Agency",
  description:
    "Schedule a free 30-minute strategy call with Nyoo Studio. No pitch, no pressure — just an honest conversation about your marketing.",
  alternates: {
    canonical: "https://nyoostudio.com/contact",
  },
  openGraph: {
    title: "Book a Free Strategy Call | Nyoo Studio",
    description:
      "Schedule a free 30-minute strategy call with Nyoo Studio. No pitch, no pressure — just an honest conversation about your marketing.",
    url: "https://nyoostudio.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
