import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { graphqlFetch } from "@/lib/graphql-client";
import { PUBLIC_CARD_QUERY } from "@/graphql/queries";
import type { CardFullFragment } from "@/graphql/generated/graphql";
import { locales, defaultLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { renderTemplate } from "@/lib/template-engine";
import { prepareTemplateData } from "@/lib/template-data";
import { prepareEmbedHtml } from "@/lib/card-fonts";
import { buildSocialLinks } from "@/utils/social-platforms";
import { CardHero } from "@/components/card-page/card-hero";
import { ProfileSidebar } from "@/components/card-page/profile-sidebar";
import { AboutSection } from "@/components/card-page/about-tab";
import { CompanySection } from "@/components/card-page/company-tab";
import { DocumentsSection } from "@/components/card-page/documents-tab";
import { MobileBottomCta } from "@/components/card-page/mobile-bottom-cta";
import { Phone, Mail, Globe, MapPin } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; cardId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

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

/* ─── Helpers ──── */

function getInitials(firstName?: string | null, lastName?: string | null) {
  const f = firstName?.charAt(0)?.toUpperCase() ?? "";
  const l = lastName?.charAt(0)?.toUpperCase() ?? "";
  return f + l || "?";
}

function MobileContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-center gap-2">
      <div className="flex shrink-0 items-center rounded-lg border border-[#EDEEED] p-2">
        <Icon className="h-6 w-6 text-[#252827]" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-[#8E9290]">{label}</p>
        <p className="truncate text-sm font-medium text-[#252827]">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80">
        {content}
      </a>
    );
  }
  return content;
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

  const websiteUrl = card.companyWebsite || card.personalWebsite;

  // Build social links using the shared utility (same icons as cardixx-themes)
  const socialLinks = buildSocialLinks(card as unknown as Record<string, unknown>);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pb-28 lg:pb-8">
        {/* ─── Card Hero (centered, both layouts) ─── */}
        <div className="mx-auto max-w-6xl px-4 pt-8 lg:px-8">
          <div className="mx-auto max-w-[513px]">
            <CardHero
              frontHtml={frontRenderedHtml}
              backHtml={backRenderedHtml || undefined}
              name={fullName}
            />
          </div>
        </div>

        {/* ─── Mobile Layout ─── */}
        <div className="mx-auto max-w-6xl px-6 lg:hidden">
          {/* Profile info */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
              {card.profilePhoto ? (
                <Image
                  src={card.profilePhoto}
                  alt={fullName}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-brand text-base font-bold text-white">
                  {getInitials(card.firstName, card.lastName)}
                </div>
              )}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-[#252827]">{fullName}</h1>
              {(card.jobTitle || card.headline) && (
                <p className="text-base font-medium text-[#4E5552]">
                  {card.jobTitle || card.headline}
                </p>
              )}
            </div>
          </div>

          {/* Social icons */}
          {socialLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="flex items-center rounded-lg border border-[#EDEEED] p-2 transition-colors hover:bg-[#FAFAFA]"
                >
                  {link.iconPath ? (
                    <Image src={link.iconPath} alt={link.label} width={24} height={24} className="h-6 w-6" />
                  ) : (
                    <span className="h-6 w-6 text-[#252827]" dangerouslySetInnerHTML={{ __html: link.svgHtml }} />
                  )}
                </a>
              ))}
            </div>
          )}

          {/* Bio */}
          {card.bio && (
            <p className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[#404644]">
              {card.bio}
            </p>
          )}

          {/* Contact info */}
          <div className="mt-6 flex flex-col gap-2">
            {card.companyPhone && (
              <MobileContactRow
                icon={Phone}
                label={sidebarTranslations.phone}
                value={card.companyPhone}
                href={`tel:${card.companyPhone}`}
              />
            )}
            {card.companyEmail && (
              <MobileContactRow
                icon={Mail}
                label={sidebarTranslations.email}
                value={card.companyEmail}
                href={`mailto:${card.companyEmail}`}
              />
            )}
            {websiteUrl && (
              <MobileContactRow
                icon={Globe}
                label={sidebarTranslations.website}
                value={websiteUrl.replace(/^https?:\/\//, "")}
                href={websiteUrl.startsWith("http") ? websiteUrl : `https://${websiteUrl}`}
              />
            )}
            {card.location && (
              <MobileContactRow
                icon={MapPin}
                label={sidebarTranslations.location}
                value={card.location}
              />
            )}
          </div>

          {/* Divider */}
          <hr className="my-8 border-[#EDEEED]" />

          {/* Company section (mobile) */}
          <CompanySection
            card={card}
            industryLabel={t("industry")}
            specialtiesLabel={t("specialties")}
          />

          {/* Divider */}
          <hr className="my-8 border-[#EDEEED]" />

          {/* Documents section (mobile) */}
          <DocumentsSection card={card} noDocumentsLabel={t("noDocuments")} />
        </div>

        {/* ─── Desktop Layout: two columns ─── */}
        <div className="mx-auto hidden max-w-6xl px-8 pt-8 lg:grid lg:grid-cols-[1fr_412px] lg:gap-8">
          {/* Left column: all sections */}
          <div>
              <AboutSection card={card} skillsLabel={t("skills")} />

            <hr className="my-8 border-[#EDEEED]" />

            <CompanySection
              card={card}
              industryLabel={t("industry")}
              specialtiesLabel={t("specialties")}
            />

            <hr className="my-8 border-[#EDEEED]" />

            <DocumentsSection card={card} noDocumentsLabel={t("noDocuments")} />
          </div>

          {/* Right column: sticky sidebar */}
          <aside>
            <div className="sticky top-[24px]">
              <ProfileSidebar card={card} translations={sidebarTranslations} />
            </div>
          </aside>
        </div>

        {/* ─── Mobile Bottom CTA ─── */}
        <MobileBottomCta
          label={t("saveToWallet")}
          downloadOnAppStore={t("downloadOnAppStore")}
          getItOnGooglePlay={t("getItOnGooglePlay")}
          getTheApp={t("getTheApp")}
        />
      </main>
    </>
  );
}
