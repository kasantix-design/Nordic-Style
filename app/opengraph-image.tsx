import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Nordic Style";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fafaf9", // Neutral-50
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: 80,
            fontWeight: 300,
            letterSpacing: "-0.02em",
            color: "#171717", // Neutral-900
          }}
        >
          Nordic Style
        </h1>
        <p
          style={{
            fontSize: 24,
            fontWeight: 300,
            color: "#737373", // Neutral-500
            marginTop: 16,
          }}
        >
          Moderne klær med tradisjon i konstruksjonen
        </p>
      </div>
    ),
    { ...size }
  );
}
