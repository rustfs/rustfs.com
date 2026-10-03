import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/app.config";
import {
  getKnowledgeArticle,
  getKnowledgeArticles,
  type KnowledgeArticleMeta,
} from "@/lib/mdx-knowledge";

type KnowledgeArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getKnowledgeArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: KnowledgeArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getKnowledgeArticle(slug);

  if (!article) {
    return {};
  }

  const url = `${SITE_CONFIG.primaryDomain}/knowledge-center/${article.slug}/`;

  return {
    title: `${article.title} | RustFS Knowledge Center`,
    description: article.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url,
      publishedTime: article.date,
      authors: [article.author],
      tags: article.tags,
      images: shouldShowImage(article.image) ? [{ url: article.image!, alt: article.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: shouldShowImage(article.image) ? [article.image!] : undefined,
    },
  };
}

export default async function KnowledgeArticlePage({ params }: KnowledgeArticlePageProps) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([getKnowledgeArticle(slug), getKnowledgeArticles()]);

  if (!article) {
    notFound();
  }

  const relatedArticles = allArticles.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <main className="relative flex-1">
      <article className="border-b border-border text-foreground">
        <header className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="pt-8">
            <Link
              href="/knowledge-center"
              className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              ← Knowledge Center
            </Link>

            <div className="mt-8 max-w-5xl">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {article.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>{formatLongDate(article.date)}</span>
                <span>{article.author}</span>
                <span>{article.readingMinutes} min read</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {shouldShowImage(article.image) ? (
              <div className="mt-12 overflow-hidden border border-border bg-card">
                <img
                  src={article.image}
                  alt=""
                  className="aspect-[16/7] w-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        </header>

        <div className="border-t border-border">
          <div
            className={[
              "mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:px-8",
              relatedArticles.length ? "lg:grid-cols-[minmax(0,48rem)_1fr]" : "",
            ].join(" ")}
          >
            <div className="min-w-0 px-0 py-2 sm:px-2 lg:px-0">
              <div
                className={[
                  "prose prose-neutral dark:prose-invert mx-auto max-w-3xl",
                  "prose-headings:scroll-mt-24 prose-headings:font-semibold prose-headings:tracking-tight",
                  "prose-h2:border-t prose-h2:border-border prose-h2:pt-8",
                  "prose-a:text-brand prose-a:no-underline prose-a:hover:underline",
                  "prose-strong:text-foreground",
                  "prose-code:break-words prose-code:text-foreground",
                  "prose-pre:rounded-none prose-pre:border prose-pre:border-border prose-pre:bg-muted/30",
                  "[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:shadow-none",
                  "[&_pre_code]:before:content-none [&_pre_code]:after:content-none",
                  "prose-blockquote:border-l-2 prose-blockquote:border-brand prose-blockquote:bg-transparent prose-blockquote:not-italic",
                  "prose-img:border prose-img:border-border prose-img:bg-transparent",
                  "prose-hr:border-border",
                ].join(" ")}
              >
                {article.content}
              </div>
            </div>

            {relatedArticles.length ? (
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="border-y border-border">
                  <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    More from the Knowledge Center
                  </div>
                  {relatedArticles.map((item) => (
                    <RelatedArticle key={item.slug} article={item} />
                  ))}
                </div>
                <div className="mt-6 border-y border-border">
                  <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Put it into practice
                  </div>
                  <Link
                    href="/erasure-code-calculator"
                    className="group block border-b border-border px-5 py-5 last:border-b-0 hover:bg-muted/35"
                  >
                    <h2 className="text-base font-semibold leading-tight text-foreground">
                      Erasure Coding Calculator
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Find the right data/parity layout for your cluster size and durability targets.
                    </p>
                    <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
                      Open
                      <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
                        ↗
                      </span>
                    </span>
                  </Link>
                </div>
              </aside>
            ) : null}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                headline: article.title,
                description: article.description,
                image: shouldShowImage(article.image) ? article.image : undefined,
                datePublished: article.date,
                dateModified: article.date,
                author: {
                  "@type": "Person",
                  name: article.author
                },
                publisher: {
                  "@type": "Organization",
                  name: "RustFS",
                  logo: {
                    "@type": "ImageObject",
                    url: "https://rustfs.com/images/rustfs-logo.png"
                  }
                },
                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `${SITE_CONFIG.primaryDomain}/knowledge-center/${article.slug}/`
                }
              })
            }}
          />
        </div>
      </article>
    </main>
  );
}

function RelatedArticle({ article }: { article: KnowledgeArticleMeta }) {
  return (
    <Link
      href={`/knowledge-center/${article.slug}`}
      className="group block border-b border-border px-5 py-5 last:border-b-0 hover:bg-muted/35"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {formatShortDate(article.date)}
      </p>
      <h2 className="mt-3 line-clamp-3 text-base font-semibold leading-tight text-foreground">
        {article.title}
      </h2>
      <span className="mt-4 inline-flex items-center text-sm font-semibold text-brand">
        Read
        <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
          ↗
        </span>
      </span>
    </Link>
  );
}

function shouldShowImage(image?: string) {
  return Boolean(image);
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}
