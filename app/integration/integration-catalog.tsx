'use client';

import Link from "next/link";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";
import type { IntegrationCategory, IntegrationProject } from "@/data/integrations";

interface IntegrationCatalogProps {
  categories: IntegrationCategory[];
}

interface IntegrationProjectWithCategory extends IntegrationProject {
  categoryId: string;
  categoryLabel: string;
}

export default function IntegrationCatalog({ categories }: IntegrationCatalogProps) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = useMemo(
    () => [
      { id: "all", label: "ALL" },
      ...categories.map((category) => ({ id: category.id, label: category.label })),
    ],
    [categories],
  );

  useEffect(() => {
    const validTabIds = new Set(tabs.map((tab) => tab.id));

    const syncFromHash = () => {
      const hashValue = window.location.hash.replace(/^#/, "").toLowerCase();
      if (hashValue && validTabIds.has(hashValue)) {
        setActiveTab(hashValue);
        return;
      }
      if (!hashValue) {
        setActiveTab("all");
      }
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => {
      window.removeEventListener("hashchange", syncFromHash);
    };
  }, [tabs]);

  useEffect(() => {
    const nextHash = `#${activeTab}`;
    if (window.location.hash.toLowerCase() === nextHash) {
      return;
    }
    window.history.replaceState(null, "", nextHash);
  }, [activeTab]);

  const projects = useMemo<IntegrationProjectWithCategory[]>(() => {
    if (activeTab === "all") {
      return categories.flatMap((category) =>
        category.projects.map((project) => ({
          ...project,
          categoryId: category.id,
          categoryLabel: category.label,
        })),
      );
    }

    const category = categories.find((item) => item.id === activeTab);
    if (!category) {
      return [];
    }

    return category.projects.map((project) => ({
      ...project,
      categoryId: category.id,
      categoryLabel: category.label,
    }));
  }, [activeTab, categories]);

  const activeTabLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? "ALL";

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % tabs.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    const nextTab = tabs[nextIndex];
    setActiveTab(nextTab.id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>("[role='tab']")
      [nextIndex]?.focus();
  };

  return (
    <div className="mt-8">
      <nav className="flex gap-px overflow-x-auto border border-border bg-border" role="tablist" aria-label="Integration category tabs">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;
          const palette = getCategoryPalette(tab.id);

          return (
            <button
              key={tab.id}
              id={`integration-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="integration-tab-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={cn(
                "group relative min-h-12 min-w-40 border-0 bg-card px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40",
                isActive ? cn("text-foreground", palette.tabActive) : "hover:bg-muted/40",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors",
                  isActive && palette.tabStripe,
                )}
              />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <div
        id="integration-tab-panel"
        role="tabpanel"
        aria-labelledby={`integration-tab-${activeTab}`}
        className="mt-5 border border-border bg-card p-4 sm:p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Active tab</p>
          <div className="flex items-center gap-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand">{activeTabLabel}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{projects.length} projects</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => {
            const palette = getCategoryPalette(project.categoryId);

            return (
              <article
                key={`${project.categoryLabel}-${project.name}`}
                data-motion-delay={String(index % 4)}
                className={cn(
                  "motion-card motion-reveal group relative flex min-h-56 flex-col overflow-hidden border p-5 transition-colors",
                  "border-border bg-card hover:border-brand/60 hover:bg-muted/30",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-0 top-0 h-0.5",
                    palette.cardTop,
                  )}
                />
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute -right-12 -top-12 h-24 w-24 blur-2xl",
                    palette.cardAura,
                  )}
                />

                <div className="mb-4 flex items-center justify-between gap-4">
                  <span className={cn("text-[10px] font-semibold uppercase tracking-[0.16em]", palette.caseText)}>
                    Case.{String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{project.categoryLabel}</span>
                </div>

                <div>
                  <h3 className="text-lg font-semibold leading-tight text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.description}</p>
                </div>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <ActionButton href={project.docsUrl} label="Docs" kind="primary" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function getCategoryPalette(categoryId: string) {
  return {
    tabActive: categoryId === "all" ? "bg-[#0062FF]/12" : "bg-[#0062FF]/10",
    tabStripe: "bg-[#0062FF]",
    cardTop: "bg-[#0062FF]",
    cardAura: "bg-[#0062FF]/25",
    caseText: "text-[#0062FF]",
  };
}

function ActionButton({ href, label, kind }: { href: string; label: string; kind: "primary" | "secondary" }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      className={`inline-flex items-center border px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
        kind === "primary"
          ? "border-brand bg-brand text-brand-foreground hover:bg-brand/90"
          : "border-border bg-card text-muted-foreground hover:border-brand hover:text-foreground"
      }`}
    >
      <span>{label}</span>
      <span className="motion-arrow ml-1.5" aria-hidden="true">
        ↗
      </span>
    </Link>
  );
}