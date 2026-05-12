import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphqlFetch } from "@/lib/graphql-client";
import { PUBLIC_CARD_QUERY } from "@/graphql/queries";
import type { CardFullFragment } from "@/graphql/generated/graphql";
import { renderTemplate } from "@/lib/template-engine";
import { computeBackgroundCss, prepareTemplateData } from "@/lib/template-data";
import { prepareEmbedHtml, ORIGINAL_CARD_WIDTH } from "@/lib/card-fonts";
import { FlipCard } from "@/components/embed/flip-card";

export const revalidate = 60;

// Card design dimensions — iframe always renders at this native size
const ORIGINAL_CARD_HEIGHT = 195;
const MAX_SCALE = 2;

interface EmbedPageProps {
  params: Promise<{ cardId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

async function fetchCard(cardId: string) {
  try {
    const data = await graphqlFetch<{ publicCard: CardFullFragment | null }>(
      PUBLIC_CARD_QUERY,
      { id: cardId, source: "embed" },
      { revalidate: 60, tags: [`card-${cardId}`] }
    );
    return data.publicCard;
  } catch {
    return null;
  }
}

function parseDimension(
  value: string | string[] | undefined,
  original: number
): number {
  if (typeof value !== "string") return original;
  const num = parseInt(value, 10);
  if (isNaN(num) || num <= 0) return original;
  return Math.min(num, original * MAX_SCALE);
}

export async function generateMetadata({
  params,
}: EmbedPageProps): Promise<Metadata> {
  const { cardId } = await params;
  return {
    title: `Cardixx Card Embed`,
    robots: { index: false, follow: false },
    other: { "X-Card-Id": cardId },
  };
}

export default async function EmbedPage({
  params,
  searchParams,
}: EmbedPageProps) {
  const { cardId } = await params;
  const sp = await searchParams;

  const card = await fetchCard(cardId);
  if (!card) notFound();

  const theme = card.theme;
  if (!theme) notFound();

  const width = parseDimension(sp.width, ORIGINAL_CARD_WIDTH);
  const height = parseDimension(sp.height, ORIGINAL_CARD_HEIGHT);

  // Build template data and render HTML for front and back
  const cardData = card as unknown as Record<string, unknown> & {
    id?: string;
    firstName?: string | null;
    lastName?: string | null;
    middleName?: string | null;
    companyName?: string | null;
    customStyles?: unknown;
    displaySettings?: Record<
      string,
      { display: boolean; required: boolean }
    >;
  };

  const themeData = {
    frontHtml: theme.frontHtml,
    backHtml: theme.backHtml,
    styleSchema: theme.styleSchema,
    defaultDisplaySettings: theme.defaultDisplaySettings,
  };

  // Render front face
  const customStylesRecord = (cardData.customStyles ?? {}) as Record<
    string,
    unknown
  >;
  const frontData = prepareTemplateData(cardData, themeData, "front");
  let frontRenderedHtml = renderTemplate(theme.frontHtml, frontData);
  frontRenderedHtml = prepareEmbedHtml(
    frontRenderedHtml,
    computeBackgroundCss(customStylesRecord, "front")
  );

  // Render back face (fallback to empty if no backHtml)
  let backRenderedHtml = "";
  if (theme.backHtml) {
    const backData = prepareTemplateData(cardData, themeData, "back");
    backRenderedHtml = renderTemplate(theme.backHtml, backData);
    backRenderedHtml = prepareEmbedHtml(
      backRenderedHtml,
      computeBackgroundCss(customStylesRecord, "back")
    );
  }

  const scale = Math.min(
    width / ORIGINAL_CARD_WIDTH,
    height / ORIGINAL_CARD_HEIGHT
  );

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-transparent p-4"
      style={{ fontFamily: "system-ui, sans-serif" }}
    >
      {backRenderedHtml ? (
        <FlipCard
          frontHtml={frontRenderedHtml}
          backHtml={backRenderedHtml}
          width={width}
          height={height}
        />
      ) : (
        <div
          style={{
            width: ORIGINAL_CARD_WIDTH * scale,
            height: ORIGINAL_CARD_HEIGHT * scale,
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          }}
        >
          <iframe
            srcDoc={frontRenderedHtml}
            title="Card embed"
            sandbox="allow-same-origin"
            className="border-0"
            style={{
              width: ORIGINAL_CARD_WIDTH,
              height: ORIGINAL_CARD_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "0 0",
            }}
          />
        </div>
      )}
    </div>
  );
}
