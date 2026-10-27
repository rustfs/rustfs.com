"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

import { REVEAL_ROOT_MARGIN, shouldRevealImmediately } from "@/lib/scrollReveal";

const REVEAL_SELECTOR = [
  "main section",
  "main > article > header",
  "main > article > div",
  "footer",
].join(",");

export default function SiteScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const clearReveal = () => {
      elements.forEach((element) => {
        delete element.dataset.scrollReveal;
      });
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.scrollReveal = "visible";
      });

      return clearReveal;
    }

    const pending = new Set<HTMLElement>();
    let frame = 0;
    let observer: IntersectionObserver | null = null;

    const publish = () => {
      const viewportHeight = window.innerHeight;

      for (const element of pending) {
        if (!shouldRevealImmediately(element.getBoundingClientRect(), viewportHeight)) {
          continue;
        }

        element.dataset.scrollReveal = "visible";
        pending.delete(element);
        observer?.unobserve(element);
      }
    };

    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          publish();
        }
      },
      {
        // Any positive intersection. A target-ratio threshold never fires
        // when the required slice is taller than the viewport.
        threshold: 0,
        rootMargin: REVEAL_ROOT_MARGIN,
      },
    );

    const viewportHeight = window.innerHeight;

    elements.forEach((element) => {
      if (shouldRevealImmediately(element.getBoundingClientRect(), viewportHeight)) {
        element.dataset.scrollReveal = "visible";
        return;
      }

      element.dataset.scrollReveal = "pending";
      pending.add(element);
      observer?.observe(element);
    });

    const schedulePublish = () => {
      if (frame !== 0 || pending.size === 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        publish();
      });
    };

    window.addEventListener("scroll", schedulePublish, { passive: true });
    window.addEventListener("resize", schedulePublish);

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }

      window.removeEventListener("scroll", schedulePublish);
      window.removeEventListener("resize", schedulePublish);
      observer?.disconnect();
      clearReveal();
    };
  }, [pathname]);

  return null;
}
