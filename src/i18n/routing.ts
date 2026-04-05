import { defineRouting } from "next-intl/routing";

export const locales = [
  "en",
  "tr",
  "de",
  "fr",
  "es",
  "pt",
  "it",
  "nl",
  "pl",
  "cs",
  "sk",
  "hu",
  "ro",
  "bg",
  "hr",
  "sl",
  "sr",
  "uk",
  "ru",
  "ja",
  "ko",
  "zh",
  "ar",
  "hi",
  "th",
  "vi",
  "id",
  "ms",
  "sv",
  "da",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});
