"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const REVEAL_SELECTOR = [
  "main section",
  "main > article > header",
  "main > article > div",
  "footer",
].join(",");

export default function SiteScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR)
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.dataset.scrollReveal = "visible";
      });

      return () => {
        elements.forEach((element) => delete element.dataset.scrollReveal);
      };
    }

    const viewportThreshold = window.innerHeight * 0.9;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target as HTMLElement;
          element.dataset.scrollReveal = "visible";
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => {
      const bounds = element.getBoundingClientRect();
      const initiallyVisible = bounds.top < viewportThreshold && bounds.bottom > 0;

      element.dataset.scrollReveal = initiallyVisible ? "visible" : "pending";

      if (!initiallyVisible) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => delete element.dataset.scrollReveal);
    };
  }, [pathname]);

  return null;
}
