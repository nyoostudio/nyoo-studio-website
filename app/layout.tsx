import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nyoostudio.com"),
  title: {
    default: "Nyoo Studio | Social Media & Content Marketing | DC Metro",
    template: "%s | Nyoo Studio",
  },
  description:
    "Nyoo Studio is a DC Metro creative marketing agency helping established small businesses grow through social media management and content strategy built for lead generation.",
  openGraph: {
    type: "website",
    siteName: "Nyoo Studio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlexSerif.variable}>
      <body className="bg-soft-black text-white font-body">
        <LocalBusinessJsonLd />
        <Header />
        <main className="pt-[72px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
