import type { IntegrationProject } from "@/data/integrations";

export type IntegrationDocSource = "rustfs-guide" | "site-guide" | "upstream-docs";

export const INTEGRATION_DOC_SOURCE_LABEL: Record<IntegrationDocSource, string> = {
  "rustfs-guide": "RustFS guide",
  "site-guide": "Site guide",
  "upstream-docs": "Upstream docs",
};

export function integrationDocSource(docsUrl: string): IntegrationDocSource {
  if (docsUrl.startsWith("/")) {
    return "site-guide";
  }

  try {
    const host = new URL(docsUrl).hostname;
    if (host === "docs.rustfs.com" || host === "rustfs.com" || host.endsWith(".rustfs.com")) {
      return "rustfs-guide";
    }
  } catch {
    return "upstream-docs";
  }

  return "upstream-docs";
}

export function integrationLinkText(project: Pick<IntegrationProject, "name" | "docsUrl" | "linkText">) {
  if (project.linkText) {
    return project.linkText;
  }

  const source = integrationDocSource(project.docsUrl);
  if (source === "upstream-docs") {
    return `Read the ${project.name} docs`;
  }
  if (source === "site-guide") {
    return `Read the ${project.name} guide`;
  }
  return `Configure ${project.name} with RustFS`;
}
