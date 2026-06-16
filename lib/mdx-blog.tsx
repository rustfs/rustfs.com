import fs from "node:fs/promises";
import path from "node:path";
import { cache, type ComponentPropsWithoutRef, type ReactElement } from "react";

import matter from "gray-matter";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { cn } from "@/lib/utils";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  tags: string[];
  image?: string;
  readingMinutes: number;
}

export interface BlogPost extends BlogPostMeta {
  content: ReactElement;
}

export const getBlogPosts = cache(async (): Promise<BlogPostMeta[]> => {
  let filenames: string[];

  try {
    filenames = await fs.readdir(BLOG_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const posts = await Promise.all(
    filenames
      .filter((filename) => filename.endsWith(".mdx"))
      .map(async (filename) => {
        const slug = filename.replace(/\.mdx$/, "");
        const source = await fs.readFile(path.join(BLOG_DIR, filename), "utf8");
        return getPostMetaFromSource(source, slug);
      })
  );

  return posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export const getBlogPost = cache(async (slug: string): Promise<BlogPost | null> => {
  if (!SLUG_PATTERN.test(slug)) {
    return null;
  }

  let source: string;

  try {
    source = await fs.readFile(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }

    throw error;
  }

  const parsed = matter(source);
  const meta = getPostMetaFromSource(source, slug);
  const { content } = await compileMDX({
    source: parsed.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return {
    ...meta,
    content,
  };
});

function getPostMetaFromSource(source: string, fallbackSlug: string): BlogPostMeta {
  const parsed = matter(source);
  const data = parsed.data;
  const title = toStringValue(data.title) || fallbackSlug;
  const description = toStringValue(data.description);
  const date = toStringValue(data.date) || new Date(0).toISOString();
  const author = toStringValue(data.author) || "RustFS Team";
  const slug = toStringValue(data.slug) || fallbackSlug;

  return {
    slug,
    title,
    description,
    date,
    author,
    tags: toStringArray(data.tags),
    image: toOptionalString(data.image),
    readingMinutes: getReadingMinutes(parsed.content),
  };
}

function toStringValue(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function toOptionalString(value: unknown): string | undefined {
  const text = toStringValue(value);
  return text || undefined;
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function getReadingMinutes(content: string): number {
  const words = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return Math.max(1, Math.ceil(words.length / 220));
}

function createHeading(level: 2 | 3 | 4) {
  const Tag = `h${level}` as const;

  return function Heading({
    className,
    ...props
  }: ComponentPropsWithoutRef<typeof Tag>) {
    return <Tag className={cn("scroll-mt-24", className)} {...props} />;
  };
}

const mdxComponents = {
  a({ href = "", className, ...props }: ComponentPropsWithoutRef<"a">) {
    const isExternal = href.startsWith("http");

    if (!isExternal && href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={cn("font-medium text-brand underline-offset-4 hover:underline", className)}
          {...props}
        />
      );
    }

    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className={cn("font-medium text-brand underline-offset-4 hover:underline", className)}
        {...props}
      />
    );
  },
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  img({ className, alt = "", ...props }: ComponentPropsWithoutRef<"img">) {
    return (
      <img
        className={cn("my-8 w-full border border-border object-cover", className)}
        alt={alt}
        loading="lazy"
        {...props}
      />
    );
  },
  pre({ className, ...props }: ComponentPropsWithoutRef<"pre">) {
    return (
      <pre
        className={cn(
          "my-8 max-w-full overflow-hidden whitespace-pre-wrap break-words border border-border bg-muted/30 p-4 text-sm leading-7 sm:overflow-x-auto",
          className
        )}
        {...props}
      />
    );
  },
  code({ className, ...props }: ComponentPropsWithoutRef<"code">) {
    const isCodeBlock = className?.includes("language-");

    return (
      <code
        className={cn(
          isCodeBlock
            ? "border-0 bg-transparent p-0 font-mono text-sm"
            : "border border-border bg-muted/30 px-1.5 py-0.5 font-mono text-[0.9em] break-words",
          className
        )}
        {...props}
      />
    );
  },
  blockquote({ className, ...props }: ComponentPropsWithoutRef<"blockquote">) {
    return (
      <blockquote
        className={cn("border-l-2 border-brand bg-transparent pl-5 not-italic", className)}
        {...props}
      />
    );
  },
  table({ className, ...props }: ComponentPropsWithoutRef<"table">) {
    return (
      <div className="my-8 overflow-x-auto border border-border">
        <table className={cn("w-full min-w-[40rem] text-left text-sm", className)} {...props} />
      </div>
    );
  },
  th({ className, ...props }: ComponentPropsWithoutRef<"th">) {
    return <th className={cn("border-b border-border bg-muted/30 px-4 py-3", className)} {...props} />;
  },
  td({ className, ...props }: ComponentPropsWithoutRef<"td">) {
    return <td className={cn("border-b border-border px-4 py-3", className)} {...props} />;
  },
};
