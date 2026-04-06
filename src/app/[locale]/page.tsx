import { setRequestLocale, getTranslations } from "next-intl/server";
import { HeroCarousel } from "@/components/landing/hero-carousel";

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
        {/* ── Background: looping video with fallback ── */}
        <div className="absolute inset-0 bg-white" />
        <div className="absolute inset-0 bg-[url('/hero-video-poster.jpg')] bg-cover bg-center opacity-20" />
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
          aria-hidden="true"
        >
          <source src="/0_Green_Blur_1920x1080.mp4" type="video/mp4" />
        </video>

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
                "linear-gradient(150deg, #6ECE6E 0%, #40C484 25%, #1CB57E 55%, #049A79 100%)",
            }}
          >
            {t("title")}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base text-[#252827] md:text-lg lg:text-xl">
            {t("subtitle")}
          </p>

          {/* Store badges */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://apps.apple.com/app/cardixx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2.5 rounded-xl bg-[#252827] px-5 transition-opacity hover:opacity-90"
              aria-label={t("appStore")}
            >
              <AppleIcon />
              <div className="text-left">
                <div className="text-[10px] leading-tight text-white/70">
                  Download on the
                </div>
                <div className="text-sm font-semibold leading-tight text-white">
                  App Store
                </div>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.cardixx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2.5 rounded-xl bg-[#252827] px-5 transition-opacity hover:opacity-90"
              aria-label={t("googlePlay")}
            >
              <GooglePlayIcon />
              <div className="text-left">
                <div className="text-[10px] leading-tight text-white/70">
                  GET IT ON
                </div>
                <div className="text-sm font-semibold leading-tight text-white">
                  Google Play
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className="relative z-10 pb-12 lg:pb-20">
          <HeroCarousel />
        </div>
      </section>
    </main>
  );
}

/* ─── Store badge icons ──────────────────────────────────── */

function AppleIcon() {
  return (
    <svg width="20" height="24" viewBox="0 0 20 24" fill="white">
      <path d="M16.52 12.58c-.03-2.85 2.33-4.22 2.44-4.29-1.33-1.94-3.4-2.21-4.13-2.24-1.76-.18-3.43 1.03-4.32 1.03-.89 0-2.27-1.01-3.73-.98-1.92.03-3.69 1.12-4.68 2.84-2 3.46-.51 8.59 1.43 11.4.95 1.37 2.08 2.92 3.57 2.86 1.43-.06 1.97-.93 3.7-.93s2.22.93 3.73.9c1.54-.03 2.52-1.4 3.46-2.78 1.09-1.59 1.54-3.13 1.57-3.21-.03-.01-3.01-1.16-3.04-4.6ZM13.71 4.21c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.85-1.37 2.2-1.2 3.5 1.27.1 2.57-.65 3.36-1.59Z" />
    </svg>
  );
}

function GooglePlayIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 22 24" fill="none">
      <path
        d="M1.22 0.58C0.93 0.88 0.75 1.35 0.75 1.97v20.06c0 0.62 0.18 1.09 0.47 1.39l0.07 0.07 11.23-11.23v-0.26L1.29 0.51 1.22 0.58Z"
        fill="#4285F4"
      />
      <path
        d="M16.26 15.99L12.52 12.26v-0.26l3.74-3.74 0.08 0.05 4.43 2.52c1.27 0.72 1.27 1.89 0 2.61l-4.43 2.52-0.08 0.05Z"
        fill="#FBBC04"
      />
      <path
        d="M16.35 15.95L12.52 12.13 1.22 23.42c0.42 0.44 1.1 0.5 1.88 0.06l13.25-7.53Z"
        fill="#EA4335"
      />
      <path
        d="M16.35 8.31L3.1 0.78C2.32 0.34 1.64 0.4 1.22 0.84l11.3 11.29 3.83-3.82Z"
        fill="#34A853"
      />
    </svg>
  );
}
