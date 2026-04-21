import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { graphqlFetch } from "@/lib/graphql-client";
import { PUBLIC_HUB_QUERY } from "@/graphql/queries";
import type { Hub } from "@/graphql/generated/graphql";
import { locales, defaultLocale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { HubImageGallery } from "@/components/hub-page/hub-image-gallery";
import { HubAboutSection } from "@/components/hub-page/hub-about-section";
import { HubServicesSection } from "@/components/hub-page/hub-services-section";
import { HubCommentsSection } from "@/components/hub-page/hub-comments-section";
import { HubPhotosSection } from "@/components/hub-page/hub-photos-section";
import { HubSidebar } from "@/components/hub-page/hub-sidebar";
import { MobileBottomCta } from "@/components/card-page/mobile-bottom-cta";
import { CheckCircle } from "lucide-react";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ locale: string; hubId: string }>;
}

const fetchHub = cache(async (hubId: string) => {
  try {
    const data = await graphqlFetch<{ publicHub: Hub | null }>(
      PUBLIC_HUB_QUERY,
      { id: hubId },
      { revalidate: 60, tags: [`hub-${hubId}`] }
    );
    return data.publicHub;
  } catch {
    return null;
  }
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { hubId, locale } = await params;
  const hub = await fetchHub(hubId);

  if (!hub) {
    return { title: "Hub Not Found | Cardixx" };
  }

  const title = `${hub.name} | Cardixx`;
  const description =
    hub.description?.slice(0, 160) ?? `${hub.name} — Networking Hub on Cardixx`;

  const baseUrl = "https://cardixx.com";
  const hubPath = `/h/${hubId}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] =
      loc === defaultLocale
        ? `${baseUrl}${hubPath}`
        : `${baseUrl}/${loc}${hubPath}`;
  }
  languages["x-default"] = `${baseUrl}${hubPath}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      ...(hub.images?.[0] && {
        images: [{ url: hub.images[0], width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(hub.images?.[0] && { images: [hub.images[0]] }),
    },
    alternates: {
      canonical:
        locale === defaultLocale
          ? `${baseUrl}${hubPath}`
          : `${baseUrl}/${locale}${hubPath}`,
      languages,
    },
  };
}

export default async function HubPage({ params }: PageProps) {
  const { hubId, locale } = await params;

  setRequestLocale(locale);

  const [hub, t] = await Promise.all([
    fetchHub(hubId),
    getTranslations("hub"),
  ]);

  if (!hub) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: hub.name,
    description: hub.description,
    ...(hub.images?.[0] && { image: hub.images[0] }),
    ...(hub.phone && { telephone: hub.phone }),
    ...(hub.website && { url: hub.website }),
    address: {
      "@type": "PostalAddress",
      streetAddress: hub.address,
      ...(hub.city && { addressLocality: hub.city }),
      ...(hub.state && { addressRegion: hub.state }),
      ...(hub.zipCode && { postalCode: hub.zipCode }),
      ...(hub.country && { addressCountry: hub.country }),
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: hub.latitude,
      longitude: hub.longitude,
    },
  };

  const sidebarTranslations = {
    openNow: t("openNow"),
    closedNow: t("closedNow"),
    getDirections: t("getDirections"),
    contact: t("contact"),
    phone: t("phone"),
    website: t("website"),
    address: t("address"),
    appStore: t("downloadOnAppStore"),
    googlePlay: t("getItOnGooglePlay"),
    getTheApp: t("getTheApp"),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="pb-28 lg:pb-8">
        {/* Hub Title + Badge */}
        <div className="mx-auto max-w-6xl px-6 pt-8 lg:px-8">
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-[#252827] lg:text-5xl lg:leading-[60px]">
              {hub.name}
            </h1>
            <span className="inline-flex w-fit items-center gap-1 rounded-full bg-[#00A068] py-0.5 pl-0.5 pr-2 text-sm font-semibold text-white">
              <CheckCircle className="h-5 w-5" />
              {t("verifiedBadge")}
            </span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mx-auto max-w-6xl px-6 pt-6 lg:px-8">
          <HubImageGallery images={hub.images ?? []} name={hub.name} />
        </div>

        {/* ─── Mobile Layout ─── */}
        <div className="mx-auto max-w-6xl px-6 pt-8 lg:hidden">
          <HubAboutSection name={hub.name} description={hub.description} />

          <hr className="my-8 border-[#EDEEED]" />

          <HubServicesSection
            amenities={hub.amenities ?? []}
            businessHours={hub.businessHours}
            translations={{
              services: t("services"),
              workingHours: t("workingHours"),
              amenities: t("amenities"),
            }}
          />

          <hr className="my-8 border-[#EDEEED]" />

          {/* Mobile sidebar info */}
          <div className="flex flex-col gap-6">
            <HubSidebar hubId={hubId} hub={hub} translations={sidebarTranslations} />
          </div>

          <hr className="my-8 border-[#EDEEED]" />

          <HubCommentsSection noCommentsLabel={t("noComments")} />

          <hr className="my-8 border-[#EDEEED]" />

          <HubPhotosSection
            images={hub.images ?? []}
            photosLabel={t("photos")}
          />
        </div>

        {/* ─── Desktop Layout: two columns ─── */}
        <div className="mx-auto hidden max-w-6xl px-8 pt-8 lg:grid lg:grid-cols-[1fr_412px] lg:gap-8">
          {/* Left column */}
          <div>
            <HubAboutSection name={hub.name} description={hub.description} />

            <hr className="my-8 border-[#EDEEED]" />

            <HubServicesSection
              amenities={hub.amenities ?? []}
              businessHours={hub.businessHours}
              translations={{
                services: t("services"),
                workingHours: t("workingHours"),
                amenities: t("amenities"),
              }}
            />

            <hr className="my-8 border-[#EDEEED]" />

            <HubCommentsSection noCommentsLabel={t("noComments")} />

            <hr className="my-8 border-[#EDEEED]" />

            <HubPhotosSection
              images={hub.images ?? []}
              photosLabel={t("photos")}
            />
          </div>

          {/* Right column: sticky sidebar */}
          <aside>
            <div className="sticky top-[96px]">
              <HubSidebar hubId={hubId} hub={hub} translations={sidebarTranslations} />
            </div>
          </aside>
        </div>

        {/* ─── Mobile Bottom CTA ─── */}
        <MobileBottomCta
          label={t("saveToWallet")}
          appStore={t("downloadOnAppStore")}
          googlePlay={t("getItOnGooglePlay")}
          getTheApp={t("getTheApp")}
        />
      </main>
    </>
  );
}
