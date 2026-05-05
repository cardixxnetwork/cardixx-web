import type { CollectionAfterChangeHook } from "payload";
import { locales, defaultLocale } from "../i18n/routing";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

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

const TRANSLATABLE_FIELDS = ["title", "excerpt"];

async function translateWithGemini(
  texts: Record<string, string>
): Promise<Record<string, Record<string, string>>> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

  const targetLocales = locales.filter((l) => l !== defaultLocale);
  const targetLanguages = targetLocales
    .map((l) => `${l}: ${LOCALE_NAMES[l]}`)
    .join(", ");

  const prompt = `Translate the following JSON values (NOT the keys) from English into these languages: ${targetLanguages}.

Return a valid JSON object where each top-level key is a locale code, and the value is an object with the same keys as the input, translated into that language. Preserve any HTML tags, markdown, or interpolation placeholders exactly as-is.

Input:
${JSON.stringify(texts, null, 2)}

Return ONLY the JSON object, no markdown fences or extra text.`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Empty Gemini response");

  return JSON.parse(text);
}

export const translatePostAfterChange: CollectionAfterChangeHook = async ({
  doc,
  req,
  context,
}) => {
  // Prevent infinite recursion — translation updates trigger afterChange again
  if (context.skipTranslation) return doc;

  // Only translate on create/update of published English content
  if (doc.status !== "published") return doc;
  if (!GEMINI_API_KEY) return doc;
  if (req.locale && req.locale !== defaultLocale) return doc;

  // Extract translatable English text
  const englishTexts: Record<string, string> = {};
  for (const field of TRANSLATABLE_FIELDS) {
    if (doc[field] && typeof doc[field] === "string") {
      englishTexts[field] = doc[field];
    }
  }

  if (Object.keys(englishTexts).length === 0) return doc;

  // Fire-and-forget — don't block the admin save
  const payload = req.payload;
  const docId = doc.id;

  (async () => {
    try {
      const translations = await translateWithGemini(englishTexts);

      for (const [locale, translated] of Object.entries(translations)) {
        if (!locales.includes(locale as typeof locales[number])) continue;

        const updateData: Record<string, string> = {};
        for (const [field, value] of Object.entries(translated)) {
          if (TRANSLATABLE_FIELDS.includes(field) && value) {
            updateData[field] = value;
          }
        }

        if (Object.keys(updateData).length > 0) {
          await payload.update({
            collection: "posts",
            id: docId,
            locale,
            data: updateData,
            context: { skipTranslation: true },
          });
        }
      }

      console.log(
        `[translatePost] Translated post "${docId}" into ${Object.keys(translations).length} locales`
      );
    } catch (error) {
      console.error("[translatePost] Translation failed:", error);
    }
  })();

  return doc;
};
