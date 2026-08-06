'use client';

import { ArrowUpRightIcon, PlugZapIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, type KeyboardEvent } from "react";

import type { IntegrationCategory, IntegrationProject } from "@/data/integrations";
import { cn } from "@/lib/utils";

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
    <div>
      <nav
        className="flex gap-px overflow-x-auto border border-border bg-border xl:grid xl:grid-cols-7"
        role="tablist"
        aria-label="Integration category tabs"
      >
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.id;

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
                "group relative min-h-16 min-w-44 bg-card px-4 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground focus:outline-hidden focus-visible:ring-2 focus-visible:ring-brand/40 xl:min-w-0",
                isActive && "bg-muted/35 text-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-0 left-0 w-0.5 bg-transparent transition-colors",
                  isActive && "bg-brand",
                )}
              />
              <span className="block font-mono text-[8px] tracking-[0.14em] text-muted-foreground">
                {String(index).padStart(2, "0")}
              </span>
              <span className="mt-1 block">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div
        id="integration-tab-panel"
        role="tabpanel"
        aria-labelledby={`integration-tab-${activeTab}`}
        className="mt-4 border border-border bg-background p-4 sm:p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Documentation paths</p>
          <div className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
            <p className="text-brand">{activeTabLabel}</p>
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <p className="text-muted-foreground">{projects.length} projects</p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={`${project.categoryLabel}-${project.name}`}
              data-motion-delay={String(index % 4)}
              className="motion-card motion-reveal group flex min-h-64 flex-col border border-border bg-card p-5 transition-colors hover:border-brand/40 hover:bg-muted/20 sm:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="motion-icon-tile flex size-11 items-center justify-center border border-border bg-background text-brand">
                  <PlugZapIcon className="size-4" />
                </span>
                <div className="text-right font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                  <p>{project.categoryLabel}</p>
                  <p className="mt-1 text-brand">Case.{String(index + 1).padStart(2, "0")}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold leading-tight tracking-tight text-foreground">
                  {project.name}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{project.description}</p>
              </div>

              <div className="mt-auto pt-7">
                <ActionButton href={project.docsUrl} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ href }: { href: string }) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener external" : undefined}
      className="motion-button group inline-flex h-10 items-center gap-2 border border-border bg-background px-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground hover:border-foreground hover:bg-foreground hover:text-background"
    >
      <span>Open docs</span>
      <ArrowUpRightIcon className="motion-arrow size-3.5" aria-hidden="true" />
    </Link>
  );
}
