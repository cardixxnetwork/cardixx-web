import type { MetadataRoute } from "next";
import { locales, defaultLocale } from "@/i18n/routing";
import { getPayload } from "payload";
import config from "@payload-config";

const BASE_URL = "https://cardixx.com";

function localizedUrls(path: string): MetadataRoute.Sitemap[number]["alternates"] {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[locale] =
      locale === defaultLocale
        ? `${BASE_URL}${path}`
        : `${BASE_URL}/${locale}${path}`;
  }
  languages["x-default"] = `${BASE_URL}${path}`;

  return { languages };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  const staticPaths = ["/", "/blog"];
  for (const p of staticPaths) {
    entries.push({
      url: `${BASE_URL}${p}`,
      lastModified: new Date(),
      changeFrequency: p === "/" ? "weekly" : "daily",
      priority: p === "/" ? 1.0 : 0.7,
      alternates: localizedUrls(p),
    });
  }

  // Blog posts from Payload CMS
  try {
    const payload = await getPayload({ config });
    const { docs: posts } = await payload.find({
      collection: "posts",
      where: { status: { equals: "published" } },
      limit: 100,
      sort: "-publishedDate",
    });

    for (const post of posts) {
      if (post.slug) {
        const path = `/blog/${post.slug}`;
        entries.push({
          url: `${BASE_URL}${path}`,
          lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
          changeFrequency: "weekly",
          priority: 0.6,
          alternates: localizedUrls(path),
        });
      }
    }
  } catch {
    // Payload unavailable — skip blog entries
  }

  return entries;
}
