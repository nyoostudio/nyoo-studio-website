import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Strategy Call | Nyoo Studio | DC Metro Marketing Agency",
  description:
    "Tell us about your business. We'll reach out within one business day to schedule your free 30-minute strategy call.",
  alternates: {
    canonical: "https://nyoostudio.com/book",
  },
  openGraph: {
    title: "Book a Free Strategy Call | Nyoo Studio",
    description:
      "Tell us about your business. We'll reach out within one business day to schedule your free 30-minute strategy call.",
    url: "https://nyoostudio.com/book",
  },
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
