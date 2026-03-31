import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nyoo Studio — DC Metro Creative Marketing Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0D0A09 0%, #0D0A09 45%, #0e1630 72%, #1B44D8 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grain-like noise overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        {/* Wordmark */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              fontSize: "28px",
              fontWeight: 300,
              letterSpacing: "0.28em",
              color: "#F2EDE4",
              fontFamily: "sans-serif",
              textTransform: "lowercase",
            }}
          >
            nyoo
            <span style={{ color: "#C41230", fontWeight: 700 }}>.</span>
            studio
          </div>

          <div
            style={{
              fontSize: "60px",
              fontWeight: 700,
              lineHeight: 1.08,
              color: "#F2EDE4",
              fontFamily: "sans-serif",
              maxWidth: "800px",
              letterSpacing: "-0.02em",
            }}
          >
            We don&apos;t bet on everyone. But when we do, we don&apos;t lose.
          </div>

          <div
            style={{
              fontSize: "18px",
              color: "#F2EDE4",
              opacity: 0.5,
              fontFamily: "sans-serif",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            DC Metro Creative Marketing Agency
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
