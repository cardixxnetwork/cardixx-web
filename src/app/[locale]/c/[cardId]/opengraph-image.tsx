import { ImageResponse } from "next/og";
import { graphqlFetch } from "@/lib/graphql-client";
import { PUBLIC_CARD_QUERY } from "@/graphql/queries";
import type { CardFullFragment } from "@/graphql/generated/graphql";

export const alt = "Cardixx Card";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ cardId: string }>;
}) {
  const { cardId } = await params;

  let card: CardFullFragment | null = null;
  try {
    const data = await graphqlFetch<{ publicCard: CardFullFragment | null }>(
      PUBLIC_CARD_QUERY,
      { id: cardId, source: "og" },
      { revalidate: 300 }
    );
    card = data.publicCard;
  } catch {
    // fallback to generic OG image
  }

  const fullName = card
    ? [card.firstName, card.lastName].filter(Boolean).join(" ")
    : "Cardixx";
  const title = card?.jobTitle || "";
  const company = card?.companyName || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Card frame */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "48px 64px",
            borderRadius: "24px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          {/* Profile circle */}
          {card?.profilePhoto ? (
            <img
              src={card.profilePhoto}
              width={120}
              height={120}
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #22c55e",
              }}
            />
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "#22c55e",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 48,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              {fullName.charAt(0)}
            </div>
          )}

          {/* Name */}
          <div
            style={{
              marginTop: 24,
              fontSize: 48,
              fontWeight: 700,
              color: "#ffffff",
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {fullName}
          </div>

          {/* Title */}
          {title && (
            <div
              style={{
                marginTop: 8,
                fontSize: 24,
                color: "#a1a1aa",
                textAlign: "center",
              }}
            >
              {title}
            </div>
          )}

          {/* Company */}
          {company && (
            <div
              style={{
                marginTop: 8,
                fontSize: 20,
                color: "#22c55e",
                textAlign: "center",
              }}
            >
              {company}
            </div>
          )}
        </div>

        {/* Logo */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: "rgba(255, 255, 255, 0.4)",
              letterSpacing: "0.05em",
            }}
          >
            CARDIXX
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
