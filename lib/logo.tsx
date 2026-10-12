import { ImageResponse } from "next/og";
import { BRAND_COLOR } from "./site";

/**
 * Renders the brand mark (a simple calculator) as a PNG.
 * `rounded` adds transparent rounded corners; Apple touch icons should be full squares.
 */
export function renderLogo(size: number, rounded = true): ImageResponse {
  const unit = size / 100;
  const key = { flex: 1, display: "flex", background: BRAND_COLOR, borderRadius: 2.5 * unit };
  const row = { flex: 1, display: "flex", gap: 4 * unit };

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_COLOR,
          borderRadius: rounded ? 22 * unit : 0,
        }}
      >
        <div
          style={{
            width: 56 * unit,
            height: 70 * unit,
            display: "flex",
            flexDirection: "column",
            gap: 4 * unit,
            padding: 6 * unit,
            background: "#ffffff",
            borderRadius: 8 * unit,
          }}
        >
          <div style={{ height: 14 * unit, display: "flex", background: "#c7d2fe", borderRadius: 3 * unit }} />
          {[0, 1, 2].map((r) => (
            <div key={r} style={row}>
              <div style={key} />
              <div style={key} />
              <div style={key} />
            </div>
          ))}
        </div>
      </div>
    ),
    { width: size, height: size },
  );
}
