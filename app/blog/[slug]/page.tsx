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
      <article className="border-y border-border text-foreground">
        <header className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <div className="border-t border-border pt-8">
            <Link
              href="/blog"
              className="inline-flex text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
            >
              ← All posts
            </Link>

            <div className="mt-8 max-w-5xl">
              <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <span>{formatLongDate(post.date)}</span>
                <span>{post.author}</span>
                <span>{post.readingMinutes} min read</span>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-border bg-card px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {shouldShowImage(post.image) ? (
              <div className="mt-12 overflow-hidden border border-border bg-card">
                <img
                  src={post.image}
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
              relatedPosts.length ? "lg:grid-cols-[minmax(0,48rem)_1fr]" : "",
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
                {post.content}
              </div>
            </div>

            {relatedPosts.length ? (
              <aside className="lg:sticky lg:top-8 lg:self-start">
                <div className="border-y border-border">
                  <div className="border-b border-border px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    Related posts
                  </div>
                  {relatedPosts.map((item) => (
                    <RelatedPost key={item.slug} post={item} />
                  ))}
                </div>
              </aside>
            ) : null}
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
