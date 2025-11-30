'use client'

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const REPO = "rustfs/rustfs";
const CACHE_MS = 60 * 60 * 1000; // 1 hour

let cachedStars: number | null = null;
let cachedAt = 0;

export default function LinkGitHub({ className }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(() => {
    if (cachedStars !== null && Date.now() - cachedAt < CACHE_MS) {
      return cachedStars;
    }
    return null;
  });

  useEffect(() => {
    if (cachedStars !== null && Date.now() - cachedAt < CACHE_MS) {
      return;
    }

    let cancelled = false;

    fetch(`https://api.github.com/repos/${REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "rustfs.com",
      },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.stargazers_count !== undefined) {
          cachedStars = data.stargazers_count;
          cachedAt = Date.now();
          setStars(data.stargazers_count);
        }
      })
      .catch(() => {
        // Fail silently; we don't want to block rendering on this.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const renderStars = () => {
    if (stars === null) {
      return (
        <span
          className="inline-block h-2.5 w-10 rounded bg-muted/60 animate-pulse"
          aria-hidden
        />
      );
    }

    return (
      <>
        <span className="hidden sm:inline">{stars.toLocaleString()}</span>
        <span className="sm:hidden">{formatCompact(stars)}</span>
      </>
    );
  };

  return (
    <Link
      href={`https://github.com/${REPO}`}
      target="_blank"
      rel="noreferrer"
      title="View on GitHub"
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground shadow-none",
        className
      )}
    >
      <GitHubIcon className="h-4 w-4" />
      <span className="text-xs text-muted-foreground tabular-nums min-w-[2.5rem]" aria-live="polite">
        {renderStars()}
      </span>
    </Link>
  );
}

function formatCompact(count: number) {
  if (count >= 1000) {
    const value = count / 1000;
    const formatted = value % 1 === 0 ? value.toFixed(0) : value.toFixed(1);
    return `${formatted}k`;
  }
  return count.toLocaleString();
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}
