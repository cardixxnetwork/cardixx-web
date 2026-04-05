/**
 * Social icon registry for theme rendering.
 * Maps schema field names to SVG content (with currentColor for theme-aware styling).
 */

import { SOCIAL_ICON_SVGS } from "./social-icons.generated";

/** Ordered list of social link fields matching schema */
export const SOCIAL_LINK_FIELDS: readonly string[] = [
  "linkedin",
  "instagram",
  "x",
  "facebook",
  "tiktok",
  "youtube",
  "github",
  "dribbble",
  "behance",
  "snapchat",
  "pinterest",
  "threads",
  "patreon",
  "spotify",
  "soundcloud",
  "appleMusic",
] as const;

/**
 * Get SVG content for a social link field.
 * Returns SVG string with fill="currentColor" for theme-aware styling.
 */
export function getSocialIconSvg(fieldName: string): string {
  return SOCIAL_ICON_SVGS[fieldName] ?? "";
}
