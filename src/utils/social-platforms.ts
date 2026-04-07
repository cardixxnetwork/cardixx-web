/**
 * Social platform configuration for card pages.
 * Uses the same SVG icons as cardixx-themes for consistency.
 */

import { SOCIAL_LINK_FIELDS, getSocialIconSvg } from './social-icons';

export interface SocialPlatformDef {
  key: string;
  label: string;
  baseUrl: string;
}

const BASE_URLS: Record<string, { label: string; baseUrl: string }> = {
  linkedin: { label: 'LinkedIn', baseUrl: 'https://linkedin.com/in/' },
  instagram: { label: 'Instagram', baseUrl: 'https://instagram.com/' },
  x: { label: 'X', baseUrl: 'https://x.com/' },
  facebook: { label: 'Facebook', baseUrl: 'https://facebook.com/' },
  tiktok: { label: 'TikTok', baseUrl: 'https://tiktok.com/@' },
  youtube: { label: 'YouTube', baseUrl: 'https://youtube.com/@' },
  github: { label: 'GitHub', baseUrl: 'https://github.com/' },
  dribbble: { label: 'Dribbble', baseUrl: 'https://dribbble.com/' },
  behance: { label: 'Behance', baseUrl: 'https://behance.net/' },
  snapchat: { label: 'Snapchat', baseUrl: 'https://snapchat.com/add/' },
  pinterest: { label: 'Pinterest', baseUrl: 'https://pinterest.com/' },
  threads: { label: 'Threads', baseUrl: 'https://threads.net/@' },
  patreon: { label: 'Patreon', baseUrl: 'https://patreon.com/' },
  spotify: { label: 'Spotify', baseUrl: 'https://open.spotify.com/user/' },
  soundcloud: { label: 'SoundCloud', baseUrl: 'https://soundcloud.com/' },
  appleMusic: { label: 'Apple Music', baseUrl: 'https://music.apple.com/' },
  whatsapp: { label: 'WhatsApp', baseUrl: 'https://wa.me/' },
  telegram: { label: 'Telegram', baseUrl: 'https://t.me/' },
  discord: { label: 'Discord', baseUrl: 'https://discord.gg/' },
  signal: { label: 'Signal', baseUrl: 'https://signal.me/#p/' },
};

export function buildSocialUrl(key: string, value: string): string {
  if (value.startsWith('http')) return value;
  const def = BASE_URLS[key];
  if (!def) return value;
  if (key === 'whatsapp') return `${def.baseUrl}${value.replace(/\D/g, '')}`;
  return `${def.baseUrl}${value}`;
}

export interface ResolvedSocialLink {
  key: string;
  url: string;
  label: string;
  svgHtml: string;
}

/**
 * Build resolved social links from a card data object.
 * Returns links in the canonical SOCIAL_LINK_FIELDS order.
 */
export function buildSocialLinks(
  cardData: Record<string, unknown>
): ResolvedSocialLink[] {
  const links: ResolvedSocialLink[] = [];

  // Also check communication platforms not in SOCIAL_LINK_FIELDS
  const allKeys = [...SOCIAL_LINK_FIELDS, 'whatsapp', 'telegram', 'discord', 'signal'];
  const seen = new Set<string>();

  for (const key of allKeys) {
    if (seen.has(key)) continue;
    seen.add(key);

    const value = cardData[key];
    if (!value || typeof value !== 'string') continue;

    const def = BASE_URLS[key];
    if (!def) continue;

    links.push({
      key,
      url: buildSocialUrl(key, value),
      label: def.label,
      svgHtml: getSocialIconSvg(key),
    });
  }

  return links;
}
