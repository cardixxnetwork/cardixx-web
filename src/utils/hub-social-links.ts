import {
  buildSocialUrl,
  type ResolvedSocialLink,
} from "./social-platforms";
import { getSocialIconSvg } from "./social-icons";

const ICON_FILENAMES: Record<string, string> = {
  linkedin: "linkedln.png",
  instagram: "instagram.png",
  x: "x.png",
  facebook: "facebook.png",
  tiktok: "tiktok.png",
  youtube: "youtube.png",
  github: "github.png",
  whatsapp: "whatsapp.png",
  telegram: "telegram.png",
  discord: "discord.png",
  snapchat: "snapchat.png",
  twitter: "x.png",
};

const PLATFORM_LABELS: Record<string, string> = {
  linkedin: "LinkedIn",
  instagram: "Instagram",
  x: "X",
  facebook: "Facebook",
  tiktok: "TikTok",
  youtube: "YouTube",
  github: "GitHub",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  discord: "Discord",
  snapchat: "Snapchat",
  twitter: "X",
};

/**
 * Build resolved social links from a hub's socialLinks JSON blob.
 * Hub socialLinks format: { "instagram": "handle", "whatsapp": "+1234" }
 */
export function buildHubSocialLinks(
  socialLinks: Record<string, string> | null | undefined
): ResolvedSocialLink[] {
  if (!socialLinks || typeof socialLinks !== "object") return [];

  const links: ResolvedSocialLink[] = [];

  for (const [key, value] of Object.entries(socialLinks)) {
    if (!value || typeof value !== "string") continue;

    const filename = ICON_FILENAMES[key];
    const label = PLATFORM_LABELS[key] ?? key;

    links.push({
      key,
      url: buildSocialUrl(key, value),
      label,
      iconPath: filename ? `/images/social/${filename}` : "",
      svgHtml: getSocialIconSvg(key),
    });
  }

  return links;
}
