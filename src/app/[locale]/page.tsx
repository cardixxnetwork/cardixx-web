import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroCarousel } from "@/components/landing/hero-carousel";
import { StoreBadges } from "@/components/shared/store-badges";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("landing");

  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        {/* ── Animated mesh background ── */}
        <div className="mesh-background absolute inset-0" />

        {/* ── Hero text content ── */}
        <div className="relative z-10 flex flex-col items-center px-5 pt-10 pb-12 text-center md:px-8 md:pt-14 lg:pt-16">
          {/* Promo pill */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/40 px-4 py-2 backdrop-blur-sm">
            <span className="text-sm font-semibold text-[#252827]">
              🚀 {t("promoPill")}
            </span>
            <span className="rounded-md bg-brand-dark px-2.5 py-0.5 text-xs font-semibold text-white">
              {t("promoAction")}
            </span>
          </div>

          {/* Title */}
          <h1
            className="mx-auto mt-6 max-w-[800px] bg-clip-text text-3xl font-semibold leading-tight tracking-tight text-transparent sm:text-4xl md:text-5xl lg:text-[60px] lg:leading-[72px]"
            style={{
              backgroundImage:
                "linear-gradient(150deg, #049A79 0%, #1CB57E 40%, #40C484 70%, #B3D16D 100%)",
            }}
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[#252827] md:text-lg lg:text-xl">
            {t("subtitle")}
          </p>

          {/* Store badges */}
          <StoreBadges
            variant="badge"
            labels={{ appStore: t("appStore"), googlePlay: t("googlePlay") }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          />
        </div>

        {/* ── Carousel ── */}
        <div className="relative z-10 pb-12 lg:pb-20">
          <HeroCarousel />
        </div>
      </section>
    </main>
  );
}
