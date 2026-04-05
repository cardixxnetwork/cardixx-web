import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Blog",
    description:
      "Insights on professional networking, digital business cards, and building meaningful connections.",
  };
}

export default async function BlogListingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("common");

  const payload = await getPayload({ config });
  const { docs: posts } = await payload.find({
    collection: "posts",
    locale,
    where: {
      status: { equals: "published" },
    },
    sort: "-publishedDate",
    limit: 20,
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">{t("blog")}</h1>

      {posts.length === 0 ? (
        <p className="mt-8 text-gray-500">No blog posts yet. Check back soon!</p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {posts.map((post) => {
            const coverImage =
              typeof post.coverImage === "object" && post.coverImage
                ? post.coverImage.url
                : null;

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
              >
                {coverImage && (
                  <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
                    <Image
                      src={coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#2AB57E]">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
