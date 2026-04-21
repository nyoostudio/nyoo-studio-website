import type { Metadata } from "next";
import { AuditApp } from "./AuditApp";

export const metadata: Metadata = {
  title: "Free 15-Minute Social Media Audit | Nyoo Studio",
  description:
    "Answer 20 questions and see where your social media is costing you leads. A free, honest audit from Nyoo Studio \u2014 DC Metro marketing agency. No pitch, no pressure.",
  alternates: {
    canonical: "https://nyoostudio.com/audit",
  },
  openGraph: {
    title: "Free Social Media Audit | Nyoo Studio",
    description:
      "Score your social media against 4 pillars in 15 minutes. Get a specific action plan.",
    url: "https://nyoostudio.com/audit",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Social Media Audit | Nyoo Studio",
    description:
      "Score your social media against 4 pillars in 15 minutes. Get a specific action plan.",
  },
};

export default function AuditPage() {
  return <AuditApp />;
}
