import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

interface OgCardProps {
  title: string;
  description: string;
  label?: string;
}

export function renderOgCard({ title, description, label }: OgCardProps) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "#0f172a",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: Logo and optional label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            {/* Logo mark */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #3b82f6, #6366f1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#ffffff",
                }}
              >
                E
              </div>
            </div>
            <div
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#94a3b8",
              }}
            >
              EVMTools
            </div>
          </div>
          {label && (
            <div
              style={{
                fontSize: "18px",
                fontWeight: 600,
                color: "#3b82f6",
                background: "rgba(59, 130, 246, 0.1)",
                border: "1px solid rgba(59, 130, 246, 0.3)",
                borderRadius: "8px",
                padding: "6px 16px",
              }}
            >
              {label}
            </div>
          )}
        </div>

        {/* Center: Title and description */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.5,
              maxWidth: "900px",
            }}
          >
            {description.length > 140
              ? description.slice(0, 137) + "..."
              : description}
          </div>
        </div>

        {/* Bottom: URL bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: "20px",
              color: "#475569",
            }}
          >
            evmtools.dev
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "2px",
                background: "#3b82f6",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "2px",
                background: "#6366f1",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "4px",
                borderRadius: "2px",
                background: "#8b5cf6",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
    }
  );
}
