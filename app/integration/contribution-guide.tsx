import { BookOpenIcon, GitPullRequestIcon } from "lucide-react";

const DOCS_REPO_URL = "https://github.com/rustfs/docs.rustfs.com";
const INTEGRATION_DOCS_URL = "https://docs.rustfs.com/en/developer/integration";

const contributionSteps = [
  {
    number: "01",
    title: "Open source projects only",
    description:
      "The project you integrate must be open source with a public GitHub repository.",
  },
  {
    number: "02",
    title: "Write the integration guide",
    description:
      "Pick the matching category in the integration docs and document the integration steps together with your verification results. Include screenshots where possible.",
  },
  {
    number: "03",
    title: "Open a pull request",
    description:
      "Submit a pull request to the docs.rustfs.com repository, add the integration label to it, and wait for review from the maintainers.",
  },
];

export default function IntegrationContributionGuide() {
  return (
    <section aria-label="Contribute an integration" className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="border border-border bg-card">
          <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.2fr_auto] lg:items-center lg:gap-10">
            <div>
              <p className="flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">
                <span className="h-px w-8 shrink-0 bg-brand" aria-hidden="true" />
                Contribute an integration
              </p>
              <h2 className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground sm:text-3xl">
                Built RustFS into your stack? Share the guide.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                Community integrations keep this directory growing. If your project works with
                RustFS, document the workflow and we will help you ship the guide.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href={DOCS_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-brand bg-brand px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-foreground transition-opacity hover:opacity-90"
              >
                <GitPullRequestIcon className="size-4" aria-hidden="true" />
                Propose an integration
              </a>
              <a
                href={INTEGRATION_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-brand hover:text-foreground"
              >
                <BookOpenIcon className="size-4" aria-hidden="true" />
                Integration docs
              </a>
            </div>
          </div>

          <ol className="grid border-t border-border md:grid-cols-3 md:divide-x md:divide-border">
            {contributionSteps.map((step) => (
              <li key={step.number} className="border-b border-border p-5 last:border-b-0 sm:p-7 md:border-b-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-brand">
                    {step.number}
                  </span>
                  <span className="h-px flex-1 bg-border" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold leading-6 text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
