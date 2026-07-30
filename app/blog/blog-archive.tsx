'use client'

import type { BlogPostMeta } from '@/lib/mdx-blog'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRef, useState, type ReactNode } from 'react'

const POSTS_PER_PAGE = 5

export default function BlogArchive({ posts }: { posts: BlogPostMeta[] }) {
  const [currentPage, setCurrentPage] = useState(1)
  const archiveRef = useRef<HTMLElement>(null)
  const pageCount = Math.ceil(posts.length / POSTS_PER_PAGE)
  const pageStart = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(pageStart, pageStart + POSTS_PER_PAGE)

  return (
    <section ref={archiveRef} className="scroll-mt-24 border-b border-border bg-muted/20 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold text-foreground">Older posts</h2>
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {posts.length} posts
          </span>
        </div>

        <div className="border border-border bg-card">
          {visiblePosts.map((post) => (
            <ArchiveRow key={post.slug} post={post} />
          ))}
        </div>

        {pageCount > 1 ? (
          <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Blog archive pages">
            <PaginationButton
              label="Previous page"
              disabled={currentPage === 1}
              onClick={() => changePage(Math.max(1, currentPage - 1))}
            >
              <ChevronLeftIcon className="size-4" />
            </PaginationButton>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <PaginationButton
                key={page}
                label={`Page ${page}`}
                active={currentPage === page}
                onClick={() => changePage(page)}
              >
                {page}
              </PaginationButton>
            ))}
            <PaginationButton
              label="Next page"
              disabled={currentPage === pageCount}
              onClick={() => changePage(Math.min(pageCount, currentPage + 1))}
            >
              <ChevronRightIcon className="size-4" />
            </PaginationButton>
          </nav>
        ) : null}
      </div>
    </section>
  )

  function changePage(page: number) {
    setCurrentPage(page)
    requestAnimationFrame(() => archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
}

function PaginationButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: {
  label: string
  active?: boolean
  disabled?: boolean
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? 'page' : undefined}
      disabled={disabled}
      onClick={onClick}
      className={`flex size-10 items-center justify-center border text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
        active
          ? 'border-brand bg-brand text-brand-foreground'
          : 'border-border bg-card text-foreground hover:border-brand hover:text-brand'
      }`}
    >
      {children}
    </button>
  )
}

function ArchiveRow({ post }: { post: BlogPostMeta }) {
  const hasImage = Boolean(post.image)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group grid gap-5 border-b border-border px-5 py-6 last:border-b-0 hover:bg-muted/35 ${
        hasImage
          ? 'md:grid-cols-[8rem_8.5rem_minmax(0,1fr)_7rem]'
          : 'md:grid-cols-[8rem_minmax(0,1fr)_7rem]'
      }`}
    >
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        {formatShortDate(post.date)}
      </div>
      {post.image ? (
        <div className="relative hidden aspect-[4/3] overflow-hidden border border-border bg-background md:block">
          <img
            src={post.image}
            alt=""
            className="absolute inset-0 size-full object-cover transition duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
      ) : null}
      <div>
        <h3 className="text-xl font-semibold leading-tight text-foreground">{post.title}</h3>
        <p className="mt-3 line-clamp-2 max-w-3xl text-sm leading-7 text-muted-foreground">
          {post.description}
        </p>
        <PostTags tags={post.tags.slice(0, 3)} />
      </div>
      <div className="flex items-start justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground md:justify-end">
        <span>{post.readingMinutes} min</span>
        <span className="motion-arrow text-brand" aria-hidden="true">↗</span>
      </div>
    </Link>
  )
}

function PostTags({ tags }: { tags: string[] }) {
  if (!tags.length) return null

  return (
    <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground before:mr-3 before:text-border before:content-['/'] first:before:hidden"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}
