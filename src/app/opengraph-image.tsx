import { ImageResponse } from "next/og";

export const alt = "EVMTools - Free Ethereum & Crypto Developer Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "60px 80px",
          background: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              fontSize: "40px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            E
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            marginBottom: "16px",
          }}
        >
          EVMTools
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            color: "#3b82f6",
            marginBottom: "24px",
          }}
        >
          35 Free Developer Tools
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "22px",
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: "800px",
            lineHeight: 1.5,
          }}
        >
          Free online tools for Ethereum and crypto developers.
          ABI encoder, Keccak256, JSON formatter, gas calculator, and more.
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: "48px",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: "#3b82f6",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: "#6366f1",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "4px",
              borderRadius: "2px",
              background: "#8b5cf6",
            }}
          />
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "20px",
            color: "#475569",
          }}
        >
          evmtools.dev
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
