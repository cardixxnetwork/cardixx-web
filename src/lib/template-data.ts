/**
 * Template data builder — ported from cardixx-mobile utils/theme-engine.ts
 *
 * Merges card data with theme display settings, style schema, and computed
 * fields (fullName, logoInitials, qrCodeUrl, socialLinks HTML) for template
 * rendering. Per-side visibility and the social-link cap come from the shared
 * `@cardixx/card-schema` package so every consumer behaves identically.
 */

import {
  type CardSide,
  type DisplaySettings,
  directCopyFields,
  type FieldDisplaySetting,
  getCardBackgroundDataUri,
  getCardLogoInitials,
  getSocialIconSvg,
  isFieldVisibleOnSide as schemaIsFieldVisibleOnSide,
  jsonFields,
  MAX_SOCIAL_LINKS_DISPLAYED,
  SOCIAL_LINK_ORDER as SOCIAL_LINK_FIELDS,
} from "@cardixx/card-schema";

import { generateCardQrCodeUrl } from "./qr-code";

/** Registry-sourced card content field names (direct columns + JSON columns). */
const FIELD_KEYS = [...directCopyFields(), ...jsonFields()] as readonly string[];

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

// Re-export the shared types so consumers in cardixx-web can keep importing
// from this file without reaching into the schema package directly.
export type { DisplaySettings, FieldDisplaySetting };

export type CardData = Record<string, unknown> & {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  middleName?: string | null;
  companyName?: string | null;
  companyLogo?: string | null;
  companyLogoBack?: string | null;
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
  // `companyLogoBack` is a virtual back-side companion of `companyLogo` —
  // surface it as a back-only field wherever `companyLogo` appears on back.
  if (fieldName === "companyLogoBack") {
    const logoSide = detectFieldSide(frontHtml, backHtml, "companyLogo");
    return logoSide === "back" || logoSide === "both" ? "back" : "none";
  }

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
  side: CardSide,
  displaySettings: DisplaySettings,
  frontHtml: string | null | undefined,
  backHtml: string | null | undefined
): boolean {
  const detectedSide = detectFieldSide(frontHtml, backHtml, fieldName);
  const sideMatches = detectedSide === side || detectedSide === "both";
  if (!sideMatches) return false;
  return schemaIsFieldVisibleOnSide(displaySettings[fieldName], side);
}

function getSideSettings(
  side: CardSide,
  displaySettings: DisplaySettings,
  frontHtml: string | null | undefined,
  backHtml: string | null | undefined
): Record<string, boolean> {
  const settings: Record<string, boolean> = {};
  for (const [fieldName, fieldSetting] of Object.entries(displaySettings)) {
    const detectedSide = detectFieldSide(frontHtml, backHtml, fieldName);
    const sideMatches = detectedSide === side || detectedSide === "both";
    settings[fieldName] =
      sideMatches && schemaIsFieldVisibleOnSide(fieldSetting, side);
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
  // Delegates to the shared `getCardLogoInitials` helper so every consumer
  // (web, mobile, themes, core) produces identical output.
  return getCardLogoInitials({
    companyName: card.companyName ?? null,
    firstName: card.firstName ?? null,
    lastName: card.lastName ?? null,
  });
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

/**
 * Compute the per-side CSS `background` declaration from a card's
 * customStyles. Mirrors cardixx-mobile/utils/theme-engine.computeBackgroundCss
 * and cardixx-core/.../card-background.computeBackgroundCss.
 */
export function computeBackgroundCss(
  customStyles: Record<string, unknown>,
  side: CardSide
): string {
  const sideTag = side === "front" ? "Front" : "Back";
  const type = (customStyles[`bg${sideTag}Type`] as string) || "color";
  if (type === "gradient") {
    const from = (customStyles[`bg${sideTag}GradFrom`] as string) || "#FFFFFF";
    const to = (customStyles[`bg${sideTag}GradTo`] as string) || "#EDE8E4";
    const angleRaw = customStyles[`bg${sideTag}GradAngle`];
    const angle = typeof angleRaw === "number" ? angleRaw : 135;
    return `background: linear-gradient(${angle}deg, ${from}, ${to});`;
  }
  if (type === "image") {
    const filename = (customStyles[`bg${sideTag}Image`] as string) || "";
    const uri = getCardBackgroundDataUri(filename);
    if (uri) return `background: url('${uri}') center/cover no-repeat;`;
  }
  const color = (customStyles[`bg${sideTag}Color`] as string) || "#FFFFFF";
  return `background: ${color};`;
}

// ── Main export ──

/**
 * Prepare template data by merging card data with computed fields and styles.
 */
export function prepareTemplateData(
  card: CardData,
  theme: ThemeData,
  side: CardSide
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
  // Per-side background CSS (color / gradient / image data URI).
  styles.backgroundCss = computeBackgroundCss(customStyles, side);

  const qrCodeColor = styles.qrCodeColor as string | undefined;
  const qrVisible = schemaIsFieldVisibleOnSide(
    mergedDisplaySettings.qrCodeUrl,
    side
  );

  const data: Record<string, unknown> = {
    fullName: getFullName(card, sideSettings),
    styles,
  };
  if (qrVisible && card.id) {
    data.qrCodeUrl = generateCardQrCodeUrl(card.id, 4, qrCodeColor);
  }

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

  // Logo / initials resolution chain — mirrors cardixx-core/mobile:
  //   front: companyLogo  → initials  → nothing
  //   back:  companyLogoBack → companyLogo → initials → nothing
  const logoVisible = schemaIsFieldVisibleOnSide(
    mergedDisplaySettings.companyLogo,
    side
  );
  const logoBackVisible = schemaIsFieldVisibleOnSide(
    mergedDisplaySettings.companyLogoBack,
    side
  );
  let resolvedLogoUrl: string | null = null;
  if (side === "front" && logoVisible && card.companyLogo) {
    resolvedLogoUrl = card.companyLogo;
  } else if (side === "back") {
    if (logoBackVisible && card.companyLogoBack) {
      resolvedLogoUrl = card.companyLogoBack;
    } else if (logoVisible && card.companyLogo) {
      resolvedLogoUrl = card.companyLogo;
    }
  }
  if (resolvedLogoUrl) {
    data.companyLogo = resolvedLogoUrl;
  } else {
    delete data.companyLogo;
    delete data.companyLogoBack;
  }

  const initialsVisible = schemaIsFieldVisibleOnSide(
    mergedDisplaySettings.logoInitials,
    side
  );
  if (!resolvedLogoUrl && initialsVisible) {
    const initials = getLogoInitials(card);
    if (initials) data.logoInitials = initials;
  }

  // Build socialLinks HTML — gated by parent `socialLinks` master switch AND
  // per-side per-field flags. Capped at MAX_SOCIAL_LINKS_DISPLAYED.
  const socialLinksHtml: string[] = [];
  const linksGroupOn = schemaIsFieldVisibleOnSide(
    mergedDisplaySettings.socialLinks,
    side
  );
  if (linksGroupOn) {
    for (const fieldName of SOCIAL_LINK_FIELDS) {
      if (socialLinksHtml.length >= MAX_SOCIAL_LINKS_DISPLAYED) break;
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
  }
  data.socialLinks = socialLinksHtml.join("");

  return data;
}
