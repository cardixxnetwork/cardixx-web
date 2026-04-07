/**
 * Social icon registry for theme preview rendering.
 * Maps schema field names to SVG content (with currentColor for theme-aware styling).
 */

import { SOCIAL_ICON_SVGS } from './social-icons.generated';

/** Ordered list of social link fields matching schema (for consistent rendering order) */
export const SOCIAL_LINK_FIELDS: readonly string[] = [
  'linkedin',
  'instagram',
  'x',
  'facebook',
  'tiktok',
  'youtube',
  'github',
  'dribbble',
  'behance',
  'snapchat',
  'pinterest',
  'threads',
  'patreon',
  'spotify',
  'soundcloud',
  'appleMusic',
] as const;

/**
 * Get SVG content for a social link field.
 * Returns SVG string with fill="currentColor" for theme-aware styling.
 */
export function getSocialIconSvg(fieldName: string): string {
  const svg = SOCIAL_ICON_SVGS[fieldName];
  if (!svg) {
    return '';
  }
  return svg;
}
