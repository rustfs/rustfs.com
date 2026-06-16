import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SITE_CONFIG } from "@/app.config";
import { getBlogPost, getBlogPosts, type BlogPostMeta } from "@/lib/mdx-blog";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  const url = `${SITE_CONFIG.primaryDomain}/blog/${post.slug}/`;

  return {
    title: `${post.title} | RustFS Blog`,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: shouldShowImage(post.image) ? [{ url: post.image!, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: shouldShowImage(post.image) ? [post.image!] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([getBlogPost(slug), getBlogPosts()]);

  if (!post) {
    notFound();
  }

  const relatedPosts = allPosts.filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <main className="relative flex-1">
      <article className="border-y border-border bg-background text-foreground">
        <header className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="border-t border-border pt-8">
            <Link
              href="/blog"
              className="motion-button inline-flex border border-border bg-card px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              ← All notes
            </Link>

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_0.28fr] lg:items-end">
              <div>
                <div className="mb-8 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-border bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="max-w-5xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-muted-foreground">
                  {post.description}
                </p>
              </div>

              <dl className="border border-border bg-card text-sm">
                <MetaItem label="Published" value={formatLongDate(post.date)} />
                <MetaItem label="Author" value={post.author} />
                <MetaItem label="Read" value={`${post.readingMinutes} min`} />
              </dl>
            </div>

            {shouldShowImage(post.image) ? (
              <div className="mt-12 overflow-hidden border border-border bg-card">
                <img
                  src={post.image}
                  alt=""
                  className="aspect-[16/7] w-full object-cover grayscale"
                  loading="lazy"
                />
              </div>
            ) : null}
          </div>
        </header>

        <div className="border-t border-border bg-muted/15">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,48rem)_1fr] lg:px-8">
            <div className="min-w-0 bg-background px-0 py-2 sm:px-2 lg:px-0">
              <div className="blog-prose mx-auto max-w-3xl">{post.content}</div>
            </div>

            <aside className="lg:sticky lg:top-8 lg:self-start">
              <div className="border border-border bg-card">
                <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Publication
                </div>
                <div className="grid text-sm">
                  <div className="grid grid-cols-[7rem_1fr] border-b border-border">
                    <span className="border-r border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Format
                    </span>
                    <span className="px-4 py-3 text-foreground">MDX mirror</span>
                  </div>
                  <div className="grid grid-cols-[7rem_1fr] border-b border-border">
                    <span className="border-r border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Updated
                    </span>
                    <span className="px-4 py-3 text-foreground">{formatShortDate(post.date)}</span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-sm leading-6 text-muted-foreground">
                    Stored locally for static delivery, with the canonical source preserved for
                    reference.
                  </p>
                  {post.sourceUrl ? (
                    <a
                      href={post.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-5 inline-flex items-center text-sm font-semibold text-brand"
                    >
                      Original WordPress post
                      <span className="motion-arrow ml-2 inline-block" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : null}
                </div>
              </div>

              {relatedPosts.length ? (
                <div className="mt-4 border border-border bg-card">
                  <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Related notes
                  </div>
                  {relatedPosts.map((item) => (
                    <RelatedPost key={item.slug} post={item} />
                  ))}
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    </main>
  );
}

function RelatedPost({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block border-b border-border px-5 py-5 last:border-b-0 hover:bg-muted/35"
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {formatShortDate(post.date)}
      </p>
      <h2 className="mt-3 line-clamp-3 text-base font-semibold leading-tight text-foreground">
        {post.title}
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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] border-b border-border last:border-b-0">
      <dt className="border-r border-border px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </dt>
      <dd className="px-4 py-3 text-foreground">{value}</dd>
    </div>
  );
}

function shouldShowImage(image?: string) {
  return Boolean(image && !image.startsWith("/images/covers/"));
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
