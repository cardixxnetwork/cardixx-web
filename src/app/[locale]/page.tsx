import { setRequestLocale, getTranslations } from "next-intl/server";

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
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
          {t("subtitle")}
        </p>
        <a
          href="https://apps.apple.com/app/cardixx"
          className="mt-8 inline-block rounded-full bg-[#2AB57E] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#239E6C]"
        >
          {t("cta")}
        </a>
      </section>
    </main>
  );
}
