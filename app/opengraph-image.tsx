import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = `${SITE_NAME} – Free Online Solve Calculator`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #4f46e5 0%, #312e81 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              background: "#ffffff",
              color: "#4f46e5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "56px",
              fontWeight: 800,
            }}
          >
            =
          </div>
          <div style={{ fontSize: "64px", fontWeight: 800 }}>{SITE_NAME}</div>
        </div>
        <div style={{ marginTop: "48px", fontSize: "56px", fontWeight: 700, lineHeight: 1.15 }}>
          Free Online Solve Calculator
        </div>
        <div style={{ marginTop: "20px", fontSize: "32px", color: "#c7d2fe" }}>
          Scientific functions · Step-by-step math solutions · No download
        </div>
      </div>
    ),
    size,
  );
}
