import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily:
            'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
          color: "#171717",
        }}
      >
        <main style={{ textAlign: "center", padding: "1rem" }}>
          <h1 style={{ fontSize: "3.75rem", fontWeight: 700 }}>404</h1>
          <p style={{ marginTop: "1rem", fontSize: "1.125rem", color: "#6b7280" }}>
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              backgroundColor: "#16a34a",
              color: "#fff",
              fontSize: "0.875rem",
              fontWeight: 500,
              textDecoration: "none",
            }}
          >
            Go Home
          </Link>
        </main>
      </body>
    </html>
  );
}
