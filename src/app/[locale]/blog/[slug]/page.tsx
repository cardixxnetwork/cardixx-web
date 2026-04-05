import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { locales, defaultLocale } from "@/i18n/routing";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

const fetchBlogPost = cache(async (slug: string, locale: string) => {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    locale,
    where: {
      slug: { equals: slug },
      status: { equals: "published" },
    },
    limit: 1,
  });
  return docs[0] ?? null;
});

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await fetchBlogPost(slug, locale);

  if (!post) {
    return { title: "Post Not Found | Cardixx" };
  }

  const title = post.title || "Blog Post";
  const description = post.excerpt || "";
  const coverImage =
    typeof post.coverImage === "object" && post.coverImage
      ? post.coverImage.url
      : undefined;
  const baseUrl = "https://cardixx.com";
  const blogPath = `/blog/${slug}`;

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] =
      loc === defaultLocale
        ? `${baseUrl}${blogPath}`
        : `${baseUrl}/${loc}${blogPath}`;
  }
  languages["x-default"] = `${baseUrl}${blogPath}`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Cardixx`,
      description,
      type: "article",
      ...(coverImage && {
        images: [{ url: coverImage, width: 1200, height: 630 }],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Cardixx`,
      description,
      ...(coverImage && { images: [coverImage] }),
    },
    alternates: {
      canonical:
        locale === defaultLocale
          ? `${baseUrl}${blogPath}`
          : `${baseUrl}/${locale}${blogPath}`,
      languages,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = await fetchBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      {post.title && (
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {post.title}
          </h1>
          {post.publishedDate && (
            <time
              dateTime={post.publishedDate}
              className="mt-3 block text-sm text-gray-500"
            >
              {new Date(post.publishedDate).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </header>
      )}

      <article className="prose prose-gray max-w-none">
        {post.content && <RichText data={post.content} />}
      </article>
    </main>
  );
}
