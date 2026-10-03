import Link from "next/link";

import { getKnowledgeArticles, type KnowledgeArticleMeta } from "@/lib/mdx-knowledge";

export default async function KnowledgeIndex() {
  const articles = await getKnowledgeArticles();
  const [featuredArticle, ...restArticles] = articles;
  const gridArticles = restArticles;

  return (
    <main className="relative flex-1">
      <section className="border-y border-border py-16 text-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="pt-8">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              <span className="h-1 w-24 bg-brand" />
              <span>RustFS knowledge center</span>
            </div>
            <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-tight text-foreground sm:text-7xl">
              Object storage, explained from first principles.
            </h1>
            <p className="mt-6 max-w-2xl text-sm leading-7 text-muted-foreground">
              Deep dives into the ideas behind RustFS and S3-compatible object storage — erasure
              coding, durability math, data placement, and the internals that keep your data safe.
            </p>
          </div>

          {featuredArticle ? (
            <div className="mt-12 space-y-4">
              <FeaturedArticle article={featuredArticle} />
              {gridArticles.length ? <ArticleGrid articles={gridArticles} /> : null}
            </div>
          ) : (
            <div className="mt-12 border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">No knowledge articles have been published yet.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FeaturedArticle({ article }: { article: KnowledgeArticleMeta }) {
  const hasImage = shouldShowImage(article.image);

  return (
    <Link
      href={`/knowledge-center/${article.slug}`}
      className="motion-card group block overflow-hidden border border-border bg-card transition-colors hover:bg-muted/30"
    >
      <div className={`grid ${hasImage ? "lg:grid-cols-[0.9fr_1.1fr]" : ""}`}>
        {hasImage ? (
          <div className="relative min-h-64 overflow-hidden border-b border-border bg-muted/30 lg:min-h-96 lg:border-r lg:border-b-0">
            <img
              src={article.image}
              alt=""
              className="absolute inset-0 size-full object-contain transition duration-300 group-hover:scale-[1.02]"
              loading="eager"
            />
          </div>
        ) : null}

        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            <span className="text-brand">Featured article</span>
            <span className="h-px flex-1 bg-border" aria-hidden="true" />
            <span>{formatShortDate(article.date)}</span>
          </div>
          <h2 className="mt-8 max-w-4xl text-2xl font-semibold leading-tight text-foreground sm:text-4xl">
            {article.title}
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{article.description}</p>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-10">
            <ArticleTags tags={article.tags.slice(0, 4)} />
            <span className="motion-arrow text-lg text-brand" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function ArticleGrid({ articles }: { articles: KnowledgeArticleMeta[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {articles.map((article, index) => (
        <Link
          key={article.slug}
          href={`/knowledge-center/${article.slug}`}
          className="motion-card group flex flex-col overflow-hidden border border-border bg-card transition-colors hover:bg-muted/30"
        >
          {shouldShowImage(article.image) ? (
            <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-background">
              <img
                src={article.image}
                alt=""
                className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          ) : null}
          <div className="flex flex-1 flex-col p-5">
            <div className="flex items-center justify-between gap-4 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span className="text-brand">Guide.{String(index + 2).padStart(2, "0")}</span>
              <span>{formatShortDate(article.date)}</span>
            </div>
            <h3 className="mt-4 line-clamp-3 text-lg font-semibold leading-tight text-foreground">
              {article.title}
            </h3>
            <div className="mt-auto flex items-center justify-between pt-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <span>{article.readingMinutes} min</span>
              <span className="motion-arrow text-brand" aria-hidden="true">
                ↗
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ArticleTags({ tags, className }: { tags: string[]; className?: string }) {
  if (!tags.length) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-x-3 gap-y-2 ${className ?? ""}`}>
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground before:mr-3 before:text-border before:content-['/'] first:before:hidden"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

function shouldShowImage(image?: string) {
  return Boolean(image);
}
