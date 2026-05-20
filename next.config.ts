import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    // Block search engine indexing on non-production environments (dev.cardixx.com,
    // stag.cardixx.com). APP_ENV is set per deployment; ANY value other than the
    // literal "production" — including missing/typo — is treated as non-prod so a
    // misconfigured deploy fails closed (no accidental indexing).
    const isProd = process.env.APP_ENV === "production";

    const headers = [
      {
        source: "/embed/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
        ],
      },
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];

    if (!isProd) {
      headers.push({
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet, noimageindex",
          },
        ],
      });
    }

    return headers;
  },
  async rewrites() {
    // Apple/Google look up these well-known paths at the apex domain.
    // We rewrite to API routes so we can serve them with the correct
    // Content-Type and dynamic env-specific app IDs.
    return [
      {
        source: "/.well-known/apple-app-site-association",
        destination: "/api/aasa",
      },
      {
        source: "/.well-known/assetlinks.json",
        destination: "/api/assetlinks",
      },
    ];
  },
  poweredByHeader: false,
};

export default withPayload(withNextIntl(nextConfig));
