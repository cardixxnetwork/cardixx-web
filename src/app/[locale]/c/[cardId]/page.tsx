import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphqlFetch } from "@/lib/graphql-client";
import { PUBLIC_CARD_QUERY } from "@/graphql/queries";
import type { CardFullFragment } from "@/graphql/generated/graphql";
import { locales, defaultLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { renderTemplate } from "@/lib/template-engine";
import { prepareTemplateData } from "@/lib/template-data";
import { prepareEmbedHtml } from "@/lib/card-fonts";
import { CardHero } from "@/components/card-page/card-hero";
import { ProfileSidebar } from "@/components/card-page/profile-sidebar";
import { CardTabs } from "@/components/card-page/card-tabs";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; cardId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

// React cache() deduplicates calls with same args within a single server render pass.
// This ensures generateMetadata and the page component share a single GraphQL request.
const fetchCard = cache(async (cardId: string, source?: string) => {
  try {
    const data = await graphqlFetch<{ publicCard: CardFullFragment | null }>(
      PUBLIC_CARD_QUERY,
      { id: cardId, source },
      { revalidate: 60, tags: [`card-${cardId}`] }
    );
    return data.publicCard;
  } catch {
    return null;
  }
});

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { cardId, locale } = await params;
  const sp = await searchParams;
  const source = typeof sp.source === "string" ? sp.source : undefined;
  const card = await fetchCard(cardId, source);

  if (!card) {
    return { title: "Card Not Found | Cardixx" };
  }

  const fullName = [card.firstName, card.lastName].filter(Boolean).join(" ");
  const title = card.jobTitle ? `${fullName} - ${card.jobTitle}` : fullName;
  const description = card.bio || card.headline || `${fullName}'s digital business card on Cardixx`;

  const baseUrl = "https://cardixx.com";
  const cardPath = `/c/${cardId}`;

  const languages: Record<string, string> = {};

  for (const loc of locales) {
    const url = loc === defaultLocale ? `${baseUrl}${cardPath}` : `${baseUrl}/${loc}${cardPath}`;
    languages[loc] = url;
  }
  languages["x-default"] = `${baseUrl}${cardPath}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Cardixx`,
      description,
      type: "profile",
      ...(card.frontImageUrl && {
        images: [{ url: card.frontImageUrl, width: 684, height: 390 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Cardixx`,
      description,
      ...(card.frontImageUrl && { images: [card.frontImageUrl] }),
    },
    alternates: {
      canonical:
        locale === defaultLocale
          ? `${baseUrl}${cardPath}`
          : `${baseUrl}/${locale}${cardPath}`,
      languages,
    },
  };
}

export default async function CardPage({ params, searchParams }: PageProps) {
  const { cardId, locale } = await params;
  const sp = await searchParams;
  const source = typeof sp.source === "string" ? sp.source : undefined;

  setRequestLocale(locale);

  const [card, t] = await Promise.all([
    fetchCard(cardId, source),
    getTranslations("card"),
  ]);

  if (!card) {
    notFound();
  }

  const fullName = [card.prefix, card.firstName, card.middleName, card.lastName, card.suffix]
    .filter(Boolean)
    .join(" ");

  // Render live theme HTML (same pipeline as cardixx-themes live-preview.tsx)
  let frontRenderedHtml = "";
  let backRenderedHtml = "";

  if (card.theme) {
    const cardData = card as unknown as Record<string, unknown> & {
      id?: string;
      firstName?: string | null;
      lastName?: string | null;
      middleName?: string | null;
      companyName?: string | null;
      customStyles?: unknown;
      displaySettings?: Record<string, { display: boolean; required: boolean }>;
    };

    const themeData = {
      frontHtml: card.theme.frontHtml,
      backHtml: card.theme.backHtml,
      styleSchema: card.theme.styleSchema,
      defaultDisplaySettings: card.theme.defaultDisplaySettings,
    };

    const frontData = prepareTemplateData(cardData, themeData, "front");
    frontRenderedHtml = prepareEmbedHtml(
      renderTemplate(card.theme.frontHtml, frontData)
    );

    if (card.theme.backHtml) {
      const backData = prepareTemplateData(cardData, themeData, "back");
      backRenderedHtml = prepareEmbedHtml(
        renderTemplate(card.theme.backHtml, backData)
      );
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: fullName,
    ...(card.jobTitle && { jobTitle: card.jobTitle }),
    ...(card.bio && { description: card.bio }),
    ...(card.profilePhoto && { image: card.profilePhoto }),
    ...(card.companyName && {
      worksFor: {
        "@type": "Organization",
        name: card.companyName,
        ...(card.companyLogo && { logo: card.companyLogo }),
        ...(card.companyWebsite && { url: card.companyWebsite }),
      },
    }),
    ...(card.companyEmail && { email: card.companyEmail }),
    ...(card.companyPhone && { telephone: card.companyPhone }),
    ...(card.location && {
      address: { "@type": "PostalAddress", addressLocality: card.location },
    }),
    ...(card.linkedin && { sameAs: [card.linkedin] }),
    url: `https://cardixx.com/c/${cardId}`,
  };

  const tabTranslations = {
    about: t("about"),
    company: t("company"),
    documents: t("documents"),
    skills: t("skills"),
    industry: t("industry"),
    specialties: t("specialties"),
    noDocuments: t("noDocuments"),
  };

  const sidebarTranslations = {
    phone: t("phone"),
    email: t("email"),
    website: t("website"),
    location: t("location"),
    saveToWallet: t("saveToWallet"),
    sendContactRequest: t("sendContactRequest"),
    downloadOnAppStore: t("downloadOnAppStore"),
    getItOnGooglePlay: t("getItOnGooglePlay"),
    getTheApp: t("getTheApp"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Desktop: two-column layout */}
        <div className="lg:grid lg:grid-cols-[1fr_360px] lg:gap-8">
          {/* Left column */}
          <div className="space-y-6">
            <CardHero
              frontHtml={frontRenderedHtml}
              backHtml={backRenderedHtml || undefined}
              name={fullName}
              flipHint={t("flipHint")}
            />

            {/* Mobile-only: profile info between hero and tabs */}
            <div className="lg:hidden">
              <ProfileSidebar card={card} translations={sidebarTranslations} />
            </div>

            <CardTabs card={card} translations={tabTranslations} />
          </div>

          {/* Right column (sticky sidebar, desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8">
              <ProfileSidebar card={card} translations={sidebarTranslations} />
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
