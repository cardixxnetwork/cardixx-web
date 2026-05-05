/**
 * Social platform configuration for card pages.
 *
 * URL building and platform labels come from `@cardixx/card-schema` so the
 * set of supported platforms, label casing, and URL canonicalization stay in
 * sync with mobile + core. Only the web-specific asset mapping (PNG filenames
 * under /public/images/social/) stays local.
 */

import {
  buildSocialUrl,
  SOCIAL_PLATFORMS,
  getSocialIconSvg,
} from "@cardixx/card-schema";

export { buildSocialUrl };

/** Maps platform key to PNG filename (in /public/images/social/). */
const ICON_FILENAMES: Record<string, string> = {
  linkedin: "linkedln.png", // matches mobile asset typo
  instagram: "instagram.png",
  x: "x.png",
  facebook: "facebook.png",
  tiktok: "tiktok.png",
  youtube: "youtube.png",
  github: "github.png",
  dribbble: "dribbble.png",
  behance: "behance.png",
  snapchat: "snapchat.png",
  pinterest: "pinterest.png",
  threads: "threads.png",
  patreon: "patreon.png",
  spotify: "spotify.png",
  soundcloud: "soundcloud.png",
  appleMusic: "applemusic.png",
  whatsapp: "whatsapp.png",
  telegram: "telegram.png",
  discord: "discord.png",
  signal: "signal.png",
  line: "line.png",
  zoom: "zoom.png",
  calendly: "calendly.png",
  bookings: "bookings.png",
};

export interface ResolvedSocialLink {
  key: string;
  url: string;
  label: string;
  /** Path to colorful PNG icon (e.g. /images/social/whatsapp.png) */
  iconPath: string;
  /** Fallback monochrome SVG HTML from the shared package */
  svgHtml: string;
}

/**
 * Build resolved social links from a card data object. Iterates the registry
 * in canonical order so link rendering matches mobile/themes.
 */
export function buildSocialLinks(
  cardData: Record<string, unknown>
): ResolvedSocialLink[] {
  const links: ResolvedSocialLink[] = [];

  for (const platform of SOCIAL_PLATFORMS) {
    const key = platform.name;
    const filename = ICON_FILENAMES[key];
    // Only render platforms that have a dedicated PNG asset — mirrors the
    // previous hand-maintained allow list (16 socials + 8 communication /
    // conferencing). Adding a new platform to the rendered set requires
    // dropping its PNG into /public/images/social/ and wiring it above.
    if (!filename) continue;

    const value = cardData[key];
    if (!value || typeof value !== "string") continue;

    const url = buildSocialUrl(key, value);
    if (!url) continue; // platform with no template + plain username → skip

    links.push({
      key,
      url,
      label: platform.label,
      iconPath: `/images/social/${filename}`,
      svgHtml: getSocialIconSvg(key),
    });
  }

  return links;
}
