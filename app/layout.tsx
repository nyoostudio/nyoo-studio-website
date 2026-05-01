import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1RKQRE8EVD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1RKQRE8EVD');
          `}
        </Script>
      </head>
      <body className="bg-soft-black text-white font-body">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-red focus:text-white focus:px-4 focus:py-2 focus:font-bold focus:outline-none"
        >
          Skip to content
        </a>
        <svg aria-hidden width="0" height="0" style={{ position: "absolute" }}>
          <defs>
            <filter id="grain-global">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
        </svg>
        <LocalBusinessJsonLd />
        <Header />
        <main id="main-content" className="pt-[72px] perspective-wrap">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
