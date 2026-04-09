/**
 * Template data builder — ported from cardixx-mobile utils/theme-engine.ts
 *
 * Merges card data with theme display settings, style schema, and computed fields
 * (fullName, logoInitials, qrCodeUrl, socialLinks HTML) for template rendering.
 */

import { getSocialIconSvg, SOCIAL_LINK_FIELDS } from "./social-icons";
import { generateCardQrCodeUrl } from "./qr-code";

// ── Types ──

export type StyleDefinition = {
  default: boolean | number | string;
  label: string;
  max?: number;
  min?: number;
  options?: {
    isPremium?: boolean;
    label: string;
    preview?: string;
    value: string;
  }[];
  section?: "color" | "font" | "layout" | "variant";
  side?: "back" | "both" | "front";
  type: "boolean" | "color" | "font" | "number" | "select" | "variant";
};

export type StyleSchema = Record<string, StyleDefinition>;

export type FieldDisplaySetting = {
  display: boolean;
  required: boolean;
};

export type DisplaySettings = Record<string, FieldDisplaySetting>;

export type CardData = Record<string, unknown> & {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  companyName?: string | null;
  customStyles?: unknown;
  displaySettings?: DisplaySettings;
};

export type ThemeData = {
  frontHtml: string;
  backHtml?: string | null;
  styleSchema?: unknown;
  defaultDisplaySettings?: DisplaySettings;
};

// Computed fields and their constituent fields
const COMPUTED_FIELDS: Record<string, string[]> = {
  fullName: ["firstName", "middleName", "lastName"],
  logoInitials: ["companyName", "firstName", "lastName"],
  qrCodeUrl: ["id"],
  socialLinks: [...SOCIAL_LINK_FIELDS],
};

// ── Helpers ──

function detectFieldSide(
  frontHtml: string | null | undefined,
  backHtml: string | null | undefined,
  fieldName: string
): "back" | "both" | "front" | "none" {
  const patterns = [
    `{{${fieldName}}}`,
    `{{{${fieldName}}}}`,
    `{{ ${fieldName} }}`,
    `{{#${fieldName}}}`,
    `{{#if ${fieldName}}}`,
    `data.${fieldName}`,
    `"${fieldName}"`,
    `'${fieldName}'`,
  ];

  let inFront = patterns.some((p) => (frontHtml || "").includes(p));
  let inBack = patterns.some((p) => (backHtml || "").includes(p));

  for (const [computedName, constituents] of Object.entries(COMPUTED_FIELDS)) {
    if (constituents.includes(fieldName)) {
      const computedPatterns = [
        `{{${computedName}}}`,
        `{{{${computedName}}}}`,
        `{{ ${computedName} }}`,
        `{{#if ${computedName}}}`,
      ];
      if (computedPatterns.some((p) => (frontHtml || "").includes(p)))
        inFront = true;
      if (computedPatterns.some((p) => (backHtml || "").includes(p)))
        inBack = true;
    }
  }

  if (inFront && inBack) return "both";
  if (inFront) return "front";
  if (inBack) return "back";
  return "none";
}

function isFieldVisibleOnSide(
  fieldName: string,
  side: "back" | "front",
  displaySettings: DisplaySettings,
  frontHtml: string | null | undefined,
  backHtml: string | null | undefined
): boolean {
  const detectedSide = detectFieldSide(frontHtml, backHtml, fieldName);
  const sideMatches = detectedSide === side || detectedSide === "both";
  const fieldSetting = displaySettings[fieldName];
  if (!fieldSetting) return sideMatches;
  return sideMatches && fieldSetting.display;
}

function getSideSettings(
  side: "back" | "front",
  displaySettings: DisplaySettings,
  frontHtml: string | null | undefined,
  backHtml: string | null | undefined
): Record<string, boolean> {
  const settings: Record<string, boolean> = {};
  for (const [fieldName, fieldSetting] of Object.entries(displaySettings)) {
    const detectedSide = detectFieldSide(frontHtml, backHtml, fieldName);
    const sideMatches = detectedSide === side || detectedSide === "both";
    settings[fieldName] = sideMatches && fieldSetting.display;
  }
  return settings;
}

function getDefaultStyles(
  styleSchema: StyleSchema
): Record<string, boolean | number | string> {
  const defaults: Record<string, boolean | number | string> = {};
  for (const [key, def] of Object.entries(styleSchema)) {
    defaults[key] = def.default;
  }
  return defaults;
}

function getLogoInitials(card: CardData): string {
  if (card.companyName) {
    return card.companyName.substring(0, 2).toLowerCase();
  }
  const firstName = (card.firstName as string) || "";
  const lastName = (card.lastName as string) || "";
  return (firstName.charAt(0) + lastName.charAt(0)).toLowerCase();
}

function getFullName(
  card: CardData,
  sideSettings: Record<string, boolean>
): string {
  const parts = [
    card.firstName,
    sideSettings.middleName ? card.middleName : null,
    card.lastName,
  ].filter(Boolean);
  return parts.join(" ");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ── Card field keys (matching schema) ──

const FIELD_KEYS = [
  "firstName",
  "lastName",
  "middleName",
  "prefix",
  "suffix",
  "preferredName",
  "pronouns",
  "maidenName",
  "profilePhoto",
  "bio",
  "jobTitle",
  "department",
  "headline",
  "skills",
  "personalWebsite",
  "companyName",
  "companyEmail",
  "companyPhone",
  "companyWebsite",
  "companyAddress",
  "companyLogo",
  "about",
  "industry",
  "specialties",
  "location",
  "companySize",
  "discord",
  "wechat",
  "line",
  "signal",
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
  "whatsapp",
  "telegram",
  "threads",
  "patreon",
  "spotify",
  "soundcloud",
  "appleMusic",
  "teams",
  "meet",
  "zoom",
  "webex",
  "calendly",
  "bookings",
  "videoLink",
  "fileUpload",
] as const;

// ── Main export ──

/**
 * Prepare template data by merging card data with computed fields and styles.
 */
export function prepareTemplateData(
  card: CardData,
  theme: ThemeData,
  side: "back" | "front"
): Record<string, unknown> {
  const styleSchema = (theme.styleSchema || {}) as StyleSchema;
  const customStyles = (card.customStyles || {}) as Record<
    string,
    boolean | number | string
  >;

  const themeDisplaySettings =
    (theme.defaultDisplaySettings as DisplaySettings) || {};
  const cardDisplaySettings = card.displaySettings || {};
  const mergedDisplaySettings: DisplaySettings = {
    ...themeDisplaySettings,
    ...cardDisplaySettings,
  };

  const sideSettings = getSideSettings(
    side,
    mergedDisplaySettings,
    theme.frontHtml,
    theme.backHtml
  );

  const styles = {
    ...getDefaultStyles(styleSchema),
    ...customStyles,
  };

  const qrCodeColor = styles.qrCodeColor as string | undefined;
  const qrVisible = isFieldVisibleOnSide(
    "qrCodeUrl",
    side,
    mergedDisplaySettings,
    theme.frontHtml,
    theme.backHtml
  );

  const data: Record<string, unknown> = {
    fullName: getFullName(card, sideSettings),
    logoInitials: getLogoInitials(card),
    qrCodeUrl:
      qrVisible && card.id
        ? generateCardQrCodeUrl(card.id, 4, qrCodeColor)
        : "",
    styles,
  };

  // Add each card field if it has value AND display is enabled for this side
  for (const fieldName of FIELD_KEYS) {
    const value = card[fieldName];
    const isVisible = isFieldVisibleOnSide(
      fieldName,
      side,
      mergedDisplaySettings,
      theme.frontHtml,
      theme.backHtml
    );
    if (value && isVisible) {
      data[fieldName] = value;
    }
  }

  // Build socialLinks HTML
  const socialLinksHtml: string[] = [];
  for (const fieldName of SOCIAL_LINK_FIELDS) {
    const value = card[fieldName];
    const isVisible = isFieldVisibleOnSide(
      fieldName,
      side,
      mergedDisplaySettings,
      theme.frontHtml,
      theme.backHtml
    );
    if (value && isVisible) {
      const svg = getSocialIconSvg(fieldName);
      socialLinksHtml.push(
        `<div class="link-row"><span class="link-icon">${svg}</span><span>${escapeHtml(String(value))}</span></div>`
      );
    }
  }
  data.socialLinks = socialLinksHtml.join("");

  return data;
}
