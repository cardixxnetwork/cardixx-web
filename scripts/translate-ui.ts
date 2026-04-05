#!/usr/bin/env tsx
/**
 * Pre-build i18n translation script.
 *
 * Reads src/messages/en.json (source of truth), detects missing or changed keys
 * for the other 29 locales, calls Google Gemini API to translate, and writes
 * the locale JSON files.
 *
 * Usage:
 *   GEMINI_API_KEY=... npx tsx scripts/translate-ui.ts
 *   npm run translate
 *
 * Behaviour:
 *   - Only translates NEW or CHANGED keys (compares against existing locale files)
 *   - Preserves existing translations that haven't changed in en.json
 *   - Sends a SINGLE Gemini API call with all missing keys for ALL locales at once
 *   - If GEMINI_API_KEY is not set, copies en.json as fallback (CI-safe)
 */

import * as fs from "fs";
import * as path from "path";

const MESSAGES_DIR = path.resolve(__dirname, "../src/messages");

const LOCALES = [
  "tr", "de", "fr", "es", "pt", "it", "nl", "pl", "cs", "sk",
  "hu", "ro", "bg", "hr", "sl", "sr", "uk", "ru", "ja", "ko",
  "zh", "ar", "hi", "th", "vi", "id", "ms", "sv", "da",
] as const;

const LOCALE_NAMES: Record<string, string> = {
  tr: "Turkish", de: "German", fr: "French", es: "Spanish",
  pt: "Portuguese", it: "Italian", nl: "Dutch", pl: "Polish",
  cs: "Czech", sk: "Slovak", hu: "Hungarian", ro: "Romanian",
  bg: "Bulgarian", hr: "Croatian", sl: "Slovenian", sr: "Serbian",
  uk: "Ukrainian", ru: "Russian", ja: "Japanese", ko: "Korean",
  zh: "Chinese (Simplified)", ar: "Arabic", hi: "Hindi", th: "Thai",
  vi: "Vietnamese", id: "Indonesian", ms: "Malay", sv: "Swedish",
  da: "Danish",
};

// ── Helpers ──

type Messages = Record<string, string | Record<string, string>>;

/** Flatten nested JSON: { card: { about: "About" } } → { "card.about": "About" } */
function flatten(
  obj: Messages,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value as Messages, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

/** Unflatten: { "card.about": "About" } → { card: { about: "About" } } */
function unflatten(flat: Record<string, string>): Messages {
  const result: Messages = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let current: Record<string, unknown> = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]] || typeof current[parts[i]] !== "object") {
        current[parts[i]] = {};
      }
      current = current[parts[i]] as Record<string, unknown>;
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

function readJson(filePath: string): Messages {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return {};
  }
}

function writeJson(filePath: string, data: Messages): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

/** Find keys in en.json that are missing or changed compared to existing locale file */
function findMissingKeys(
  enFlat: Record<string, string>,
  localeFlat: Record<string, string>,
  prevEnFlat: Record<string, string>
): Record<string, string> {
  const missing: Record<string, string> = {};
  for (const [key, value] of Object.entries(enFlat)) {
    // Key doesn't exist in locale file
    if (!(key in localeFlat)) {
      missing[key] = value;
      continue;
    }
    // English value changed since last translation (locale still has old translation)
    if (prevEnFlat[key] && prevEnFlat[key] !== value) {
      missing[key] = value;
    }
  }
  return missing;
}

// ── Gemini translation ──

async function translateWithGemini(
  texts: Record<string, string>,
  targetLocales: string[]
): Promise<Record<string, Record<string, string>>> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set");

  const languages = targetLocales
    .map((l) => `"${l}": "${LOCALE_NAMES[l]}"`)
    .join(", ");

  const prompt = `You are a professional translator. Translate the following JSON values (NOT the keys) from English into these languages: {${languages}}.

Rules:
- Return a JSON object where each top-level key is a locale code from the list above
- Each value is an object with the EXACT same keys as the input, translated into that language
- Preserve all interpolation placeholders like {name}, {count} etc. exactly as-is
- Keep brand names (Cardixx) untranslated
- Use natural, professional language appropriate for a B2C tech product

Input:
${JSON.stringify(texts, null, 2)}

Return ONLY valid JSON, no markdown fences or explanation.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status} ${await res.text()}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");

  return JSON.parse(text);
}

// ── Main ──

async function main() {
  console.log("🌐 translate-ui: Starting...\n");

  const enPath = path.join(MESSAGES_DIR, "en.json");
  const en = readJson(enPath);
  const enFlat = flatten(en);

  const keyCount = Object.keys(enFlat).length;
  console.log(`   Source: en.json (${keyCount} keys)`);

  // Load previous en.json snapshot (for change detection)
  const prevEnPath = path.join(MESSAGES_DIR, ".en-snapshot.json");
  const prevEnFlat = fs.existsSync(prevEnPath)
    ? flatten(readJson(prevEnPath))
    : {};

  // Collect keys that need translation per locale
  const allMissing: Record<string, string> = {};
  const localesNeedingTranslation: string[] = [];

  for (const locale of LOCALES) {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const existing = readJson(localePath);
    const existingFlat = flatten(existing);
    const missing = findMissingKeys(enFlat, existingFlat, prevEnFlat);

    if (Object.keys(missing).length > 0) {
      localesNeedingTranslation.push(locale);
      // Merge into allMissing (union of all missing keys across locales)
      Object.assign(allMissing, missing);
    }
  }

  if (localesNeedingTranslation.length === 0) {
    console.log("   ✅ All locales are up to date. Nothing to translate.\n");
    // Still save snapshot
    writeJson(prevEnPath, en);
    return;
  }

  const missingKeyCount = Object.keys(allMissing).length;
  console.log(
    `   🔍 Found ${missingKeyCount} key(s) to translate for ${localesNeedingTranslation.length} locale(s)`
  );

  // Check if Gemini API key is available
  if (!process.env.GEMINI_API_KEY) {
    console.log(
      "   ⚠️  GEMINI_API_KEY not set. Copying en.json as fallback for all locales.\n"
    );
    for (const locale of LOCALES) {
      writeJson(path.join(MESSAGES_DIR, `${locale}.json`), en);
    }
    writeJson(prevEnPath, en);
    return;
  }

  // Single Gemini call for all locales
  console.log(
    `   🤖 Calling Gemini API (${missingKeyCount} keys × ${localesNeedingTranslation.length} locales)...`
  );

  const translations = await translateWithGemini(
    allMissing,
    localesNeedingTranslation
  );

  // Merge translations into existing locale files
  let updatedCount = 0;
  for (const locale of LOCALES) {
    const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
    const existing = readJson(localePath);
    const existingFlat = flatten(existing);

    if (translations[locale]) {
      // Merge new translations with existing ones
      const merged = { ...existingFlat, ...translations[locale] };

      // Remove keys that no longer exist in en.json
      for (const key of Object.keys(merged)) {
        if (!(key in enFlat)) {
          delete merged[key];
        }
      }

      writeJson(localePath, unflatten(merged));
      updatedCount++;
    } else if (localesNeedingTranslation.includes(locale)) {
      // Locale needed translation but Gemini didn't return it — keep existing
      console.warn(`   ⚠️  No translation returned for ${locale}`);
    }
    // Locales not in localesNeedingTranslation are already up to date
  }

  // Save en.json snapshot for next run's change detection
  writeJson(prevEnPath, en);

  console.log(
    `\n   ✅ Updated ${updatedCount} locale file(s) successfully.\n`
  );
}

main().catch((err) => {
  console.error("❌ translate-ui failed:", err.message);
  process.exit(1);
});
