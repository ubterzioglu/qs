import Link from "next/link";

// Root-level fallback for URLs that don't match any locale segment at all
// (e.g. arbitrary typos). Kept dependency-free (no next-intl) since it can
// render outside any locale context; mirrors the [locale]/not-found design.
export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e1f",
          color: "#f3efe6",
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: "1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            width: "100%",
            border: "1px solid #263156",
            padding: "3rem 2rem",
          }}
        >
          <p
            style={{
              fontFamily: "ui-monospace, 'SF Mono', monospace",
              fontSize: "0.6875rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#c8a15a",
              margin: 0,
            }}
          >
            ERR · 404 — NOT FOUND
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "2rem",
              marginTop: "2rem",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "5rem", lineHeight: 1, color: "#c8a15a" }}>404</span>
            <div>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 500, margin: 0 }}>Page not found</h1>
              <p style={{ color: "#a9b2c9", marginTop: "0.75rem", fontFamily: "system-ui, sans-serif" }}>
                The page you&apos;re looking for has moved, been renamed, or never existed.
              </p>
            </div>
          </div>
          <div
            style={{
              height: 1,
              background: "linear-gradient(to right, #c8a15a, transparent)",
              marginTop: "2.5rem",
            }}
          />
          <div style={{ marginTop: "2rem" }}>
            <Link
              href="/"
              style={{
                fontFamily: "ui-monospace, 'SF Mono', monospace",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#c8a15a",
                textDecoration: "underline",
                textUnderlineOffset: "4px",
              }}
            >
              Back to home →
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
