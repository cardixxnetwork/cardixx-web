import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // ONLY the literal "production" allows indexing. Any other value — including
  // missing/typo — falls through to full Disallow so a misconfigured deploy
  // fails closed (never accidentally indexed). Combined with X-Robots-Tag
  // header in next.config.ts for belt-and-suspenders coverage.
  const isProd = process.env.APP_ENV === "production";

  if (!isProd) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/embed/"],
      },
    ],
    sitemap: "https://cardixx.com/sitemap.xml",
  };
}
