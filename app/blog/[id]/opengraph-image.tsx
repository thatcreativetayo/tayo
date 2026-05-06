import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
  let title = "Tayo's Blog";
  let description = "";
  let coverImage = "";

  try {
    const res = await fetch(`${apiUrl}/blogs/${params.id}`, { next: { revalidate: 3600 } });
    const data = await res.json();
    if (data.success) {
      title = data.data.title;
      description = data.data.description;
      coverImage = data.data.coverImage || "";
    }
  } catch {}

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#fbfbfb",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {coverImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverImage}
            alt=""
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.35,
            }}
          />
        )}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(45,25,9,0.95) 0%, rgba(45,25,9,0.3) 60%, transparent 100%)",
          }}
        />
        <div style={{ padding: "48px 56px", position: "relative", zIndex: 1 }}>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 18, margin: "0 0 12px" }}>
            Tayo Eyitayo · Blog
          </p>
          <h1 style={{ color: "#fff", fontSize: 52, fontWeight: 700, margin: "0 0 16px", lineHeight: 1.15 }}>
            {title}
          </h1>
          {description && (
            <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 22, margin: 0, lineHeight: 1.5 }}>
              {description.slice(0, 120)}{description.length > 120 ? "…" : ""}
            </p>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
