/**
 * Google Fonts injection for card embeds.
 * Ported from cardixx-themes/src/components/preview/live-preview.tsx
 */

const CARD_FONTS = [
  "Inter",
  "Montserrat",
  "Nunito Sans",
  "Poppins",
  "Roboto",
  "Lora",
  "Noto Serif Display",
  "Cormorant Garamond",
  "Libre Baskerville",
  "Rosario",
  "Open Sans",
];

const ORIGINAL_CARD_WIDTH = 342;

/**
 * Promote each declaration in a `background: ...; ...` CSS string to
 * `!important` so the per-side override beats the theme's own body styles.
 */
function buildBackgroundOverride(bodyBackgroundCss?: string): string {
  if (!bodyBackgroundCss) return "";
  const important = bodyBackgroundCss
    .split(";")
    .map((d) => d.trim())
    .filter(Boolean)
    .map((d) => `${d} !important;`)
    .join(" ");
  return important ? `<style>body { ${important} }</style>` : "";
}

/**
 * Inject Google Fonts into rendered theme HTML for embed display.
 * Themes are expected to have complete HTML documents with <head> tags.
 *
 * Optional `bodyBackgroundCss` (e.g. `background: linear-gradient(...);`)
 * is injected as an `!important` rule on `body` so the user's per-side
 * background override wins against whatever the theme's CSS sets.
 */
export function prepareEmbedHtml(
  html: string,
  bodyBackgroundCss?: string
): string {
  if (!html) return "";

  const fontsParam = CARD_FONTS.map(
    (f) => `family=${f.replace(/ /g, "+")}:wght@400;500;600`
  ).join("&");
  const googleFontsUrl = `https://fonts.googleapis.com/css2?${fontsParam}&display=swap`;

  const fontLinks = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${googleFontsUrl}" rel="stylesheet">`;

  const bgOverride = buildBackgroundOverride(bodyBackgroundCss);

  let result = html;

  if (result.includes("</head>")) {
    // Theme has a proper HTML document structure — inject fonts before </head>
    result = result.replace("</head>", `${fontLinks}${bgOverride}</head>`);

    if (result.includes('<meta name="viewport"')) {
      result = result.replace(
        /<meta name="viewport" content="[^"]*">/,
        `<meta name="viewport" content="width=${ORIGINAL_CARD_WIDTH}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">`
      );
    }
  } else {
    // Theme HTML is a fragment — wrap in a full document
    result = `<!DOCTYPE html><html><head><meta name="viewport" content="width=${ORIGINAL_CARD_WIDTH}, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">${fontLinks}${bgOverride}</head><body style="margin:0;padding:0;overflow:hidden">${result}</body></html>`;
  }

  return result;
}

export { ORIGINAL_CARD_WIDTH, CARD_FONTS };
