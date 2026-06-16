'use client'

import { Button } from '@/components/ui/button'
import { formatReleaseDate, formatVersion, getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github'
import AppleIcon from '@/public/svgs/brands/apple.svg'
import DockerIcon from '@/public/svgs/brands/docker.svg'
import LinuxIcon from '@/public/svgs/brands/linux.svg'
import WindowsIcon from '@/public/svgs/brands/windows.svg'
import {
    ArrowUpRightIcon,
    BinaryIcon,
    BookOpenIcon,
    CloudIcon,
    DownloadIcon,
    HardDriveIcon,
    LayersIcon,
    MessageCircleIcon,
    ServerIcon,
} from 'lucide-react'
import Link from 'next/link'
import type { ComponentType, ReactNode } from 'react'
import CodeBlock from './code-block'
import InstallationTopology from './installation-topology'
import RcDownloadSection from './rc-download-section'

interface DownloadPageClientProps {
  release: GitHubRelease | null;
  cliRelease: GitHubRelease | null;
}

function getAssetName(url: string | null, fallback: string) {
  if (!url) {
    return fallback;
  }

  const match = decodeURIComponent(url).match(/([^/]+\.(zip|tar\.gz|tgz|exe|deb|rpm))($|\?)/i);
  return match?.[1] ?? fallback;
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-t border-border pt-8">
      <div className="mb-8 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-foreground sm:text-5xl">
            {title}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
          {description}
        </p>
      </div>
    </div>
  );
}

function ReleasePanel({ release }: { release: GitHubRelease | null }) {
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';
  const publishedAt = release?.published_at ? formatReleaseDate(release.published_at, 'en-US') : 'GitHub latest';

  return (
    <div className="border border-border bg-card">
      <div className="grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:grid-cols-[1fr_auto]">
        <span className="px-4 py-3">Current server release</span>
        <a
          href={releaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-t border-border px-4 py-3 text-foreground hover:text-brand sm:border-l sm:border-t-0"
        >
          GitHub
        </a>
      </div>
      <div className="grid gap-0 sm:grid-cols-3">
        <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Version</p>
          <p className="mt-3 font-display text-3xl font-semibold text-foreground">
            {release?.tag_name ? formatVersion(release.tag_name) : 'Latest'}
          </p>
        </div>
        <div className="border-b border-border p-5 sm:border-b-0 sm:border-r">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Published</p>
          <p className="mt-3 text-base font-semibold text-foreground">{publishedAt}</p>
        </div>
        <div className="p-5">
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Artifacts</p>
          <p className="mt-3 text-base font-semibold text-foreground">
            {release?.assets?.length ? `${release.assets.length} files` : 'Release page'}
          </p>
        </div>
      </div>
    </div>
  );
}

function InstallCard({
  icon: Icon,
  label,
  title,
  description,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <article className="motion-card flex min-w-0 flex-col border border-border bg-card">
      <div className="flex items-start gap-4 border-b border-border p-5">
        <span className="motion-icon-tile flex size-12 shrink-0 items-center justify-center bg-brand text-brand-foreground">
          <Icon className="size-5" />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{label}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-5 p-5">{children}</div>
    </article>
  );
}

function ArtifactButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  return (
    <Button asChild size="lg" className="h-11 w-full justify-between px-4 text-sm font-semibold">
      <a href={href} target="_blank" rel="noopener noreferrer">
        <span className="inline-flex items-center gap-2">
          {icon}
          {label}
        </span>
        <DownloadIcon data-icon="inline-end" className="size-4" />
      </a>
    </Button>
  );
}

function PlatformBadge({
  icon,
  label,
}: {
  icon: ReactNode;
  label: string;
}) {
  return (
    <span className="inline-flex h-9 items-center gap-2 border border-border bg-background px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      <span className="size-4 text-foreground">{icon}</span>
      {label}
    </span>
  );
}

function LinuxBinaryInstall({ release }: { release: GitHubRelease | null }) {
  const x86Url = release
    ? getDownloadUrlForPlatform(release, 'linux', 'x86_64')
    : null;
  const armUrl = release
    ? getDownloadUrlForPlatform(release, 'linux', 'aarch64')
    : null;
  const fallbackUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';
  const x86FinalUrl = x86Url ?? fallbackUrl;
  const armFinalUrl = armUrl ?? fallbackUrl;
  const x86Name = getAssetName(x86Url, 'rustfs-linux-x86_64-musl.zip');
  const armName = getAssetName(armUrl, 'rustfs-linux-aarch64-musl.zip');

  return (
    <InstallCard
      icon={BinaryIcon}
      label="Recommended for servers"
      title="Linux binary"
      description="Use this path when you want a small, direct RustFS server binary and a system service under your control."
    >
      <CodeBlock
        title="Quick local validation"
        code={[
          'curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh',
          'mkdir -p ~/rustfs-data',
          'rustfs ~/rustfs-data',
        ]}
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <ArtifactButton
          href={x86FinalUrl}
          label="Linux x86_64"
          icon={<LinuxIcon className="size-4" />}
        />
        <ArtifactButton
          href={armFinalUrl}
          label="Linux ARM64"
          icon={<LinuxIcon className="size-4" />}
        />
      </div>

      <CodeBlock
        title="Manual install"
        code={[
          `curl -L -O ${x86FinalUrl}`,
          `unzip ${x86Name}`,
          'chmod +x rustfs',
          'sudo install -m 755 rustfs /usr/local/bin/rustfs',
          'rustfs --version',
        ]}
      />

      <p className="text-xs leading-6 text-muted-foreground">
        ARM64 follows the same flow with <code className="text-foreground">{armName}</code>.
      </p>
    </InstallCard>
  );
}

function DockerInstall() {
  return (
    <InstallCard
      icon={DockerIcon}
      label="Container path"
      title="Docker single node"
      description="Best for quick evaluation, local development, and smoke testing S3-compatible clients."
    >
      <CodeBlock
        title="Run a persistent container"
        code={[
          'docker volume create rustfs-data',
          'docker run -d --name rustfs -p 9000:9000 -p 9001:9001 -v rustfs-data:/data rustfs/rustfs:latest /data',
          'docker logs -f rustfs',
        ]}
      />
      <div className="grid border border-border bg-background text-xs sm:grid-cols-3">
        <span className="border-b border-border px-3 py-3 font-semibold sm:border-b-0 sm:border-r">9000 S3 API</span>
        <span className="border-b border-border px-3 py-3 font-semibold sm:border-b-0 sm:border-r">9001 Console</span>
        <span className="px-3 py-3 font-semibold">/data Volume</span>
      </div>
    </InstallCard>
  );
}

function ComposeInstall() {
  return (
    <InstallCard
      icon={LayersIcon}
      label="Repeatable lab"
      title="Docker Compose"
      description="Keep a repeatable local stack in source control before moving the same storage layout to production nodes."
    >
      <CodeBlock
        title="Create compose stack"
        code={[
          'mkdir rustfs-compose && cd rustfs-compose',
          'curl -O https://rustfs.com/docker-compose.yml',
          'docker compose up -d',
        ]}
      />
      <p className="text-xs leading-6 text-muted-foreground">
        Use Compose when you need stable ports, named volumes, and a setup teammates can reproduce without reading long docs.
      </p>
    </InstallCard>
  );
}

function KubernetesInstall() {
  return (
    <InstallCard
      icon={CloudIcon}
      label="Cluster path"
      title="Kubernetes and Helm"
      description="Use Helm for cloud-native deployment, GitOps review, and repeatable configuration across environments."
    >
      <CodeBlock
        title="Install with Helm"
        code={[
          'helm repo add rustfs https://charts.rustfs.com',
          'helm repo update',
          'helm install rustfs rustfs/rustfs --namespace rustfs --create-namespace',
        ]}
      />
      <div className="grid border border-border bg-background text-xs sm:grid-cols-3">
        <span className="border-b border-border px-3 py-3 font-semibold sm:border-b-0 sm:border-r">StatefulSet</span>
        <span className="border-b border-border px-3 py-3 font-semibold sm:border-b-0 sm:border-r">PVC backed</span>
        <span className="px-3 py-3 font-semibold">Ingress ready</span>
      </div>
    </InstallCard>
  );
}

function WorkstationInstall({ release }: { release: GitHubRelease | null }) {
  const macArmUrl = release
    ? getDownloadUrlForPlatform(release, 'macos', 'aarch64')
    : null;
  const macX86Url = release
    ? getDownloadUrlForPlatform(release, 'macos', 'x86_64')
    : null;
  const windowsUrl = release
    ? getDownloadUrlForPlatform(release, 'windows', 'x86_64')
    : null;
  const fallbackUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';

  return (
    <InstallCard
      icon={HardDriveIcon}
      label="Workstation binaries"
      title="macOS and Windows"
      description="Use workstation binaries for client validation, demos, and isolated compatibility testing outside Linux servers."
    >
      <div className="flex flex-wrap gap-2">
        <PlatformBadge icon={<AppleIcon className="size-4" />} label="macOS" />
        <PlatformBadge icon={<WindowsIcon className="size-4" />} label="Windows" />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        <ArtifactButton
          href={macArmUrl ?? fallbackUrl}
          label="Apple Silicon"
          icon={<AppleIcon className="size-4" />}
        />
        <ArtifactButton
          href={macX86Url ?? fallbackUrl}
          label="macOS Intel"
          icon={<AppleIcon className="size-4" />}
        />
        <ArtifactButton
          href={windowsUrl ?? fallbackUrl}
          label="Windows x86_64"
          icon={<WindowsIcon className="size-4" />}
        />
      </div>

      <CodeBlock
        title="macOS manual install"
        code={[
          `curl -L -O ${macArmUrl ?? fallbackUrl}`,
          `unzip ${getAssetName(macArmUrl, 'rustfs-macos-aarch64.zip')}`,
          'chmod +x rustfs',
          'sudo install -m 755 rustfs /usr/local/bin/rustfs',
        ]}
      />
    </InstallCard>
  );
}

function HelpPanel() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Support surface"
          title="Need a production deployment path?"
          description="Move from local validation to production with documentation, community help, or direct planning support."
        />

        <div className="grid border border-border bg-card md:grid-cols-3">
          <a
            href="https://docs.rustfs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group border-b border-border p-6 transition-colors hover:bg-muted/40 md:border-b-0 md:border-r"
          >
            <BookOpenIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Read the docs</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Configuration, deployment, S3 clients, and operations guidance.</p>
            <ArrowUpRightIcon className="motion-arrow mt-8 size-5 text-brand" />
          </a>
          <Link
            href="/contact-us"
            className="motion-card group border-b border-border p-6 transition-colors hover:bg-muted/40 md:border-b-0 md:border-r"
          >
            <ServerIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Plan deployment</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Migration, capacity planning, production topology, and support scope.</p>
            <ArrowUpRightIcon className="motion-arrow mt-8 size-5 text-brand" />
          </Link>
          <a
            href="https://github.com/rustfs/rustfs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group p-6 transition-colors hover:bg-muted/40"
          >
            <MessageCircleIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Report an issue</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Share compatibility feedback, installation friction, or operational questions.</p>
            <ArrowUpRightIcon className="motion-arrow mt-8 size-5 text-brand" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function DownloadPageClient({ release, cliRelease }: DownloadPageClientProps) {
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';

  return (
    <main className="relative z-10 min-h-screen text-foreground">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Download surface</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
                Install RustFS by how you actually deploy storage.
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
                Pick the shortest route for validation, containers, Kubernetes, or the native rc admin CLI. Each path keeps the commands close to the decision you are making.
              </p>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                <PlatformBadge icon={<LinuxIcon className="size-4" />} label="Linux" />
                <PlatformBadge icon={<DockerIcon className="size-4" />} label="Docker" />
                <PlatformBadge icon={<AppleIcon className="size-4" />} label="macOS" />
                <PlatformBadge icon={<WindowsIcon className="size-4" />} label="Windows" />
              </div>
            </div>
          </div>

          <div className="mt-12">
            <ReleasePanel release={release} />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Server install paths"
            title="Start small, then keep the same operating model."
            description="Local binary validation, Docker, Compose, and Helm are separate decisions. The page keeps them separate so users can copy the right command without reading around it."
          />

          <div className="grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            <LinuxBinaryInstall release={release} />
            <DockerInstall />
            <ComposeInstall />
            <KubernetesInstall />
          </div>

          <div className="mt-6">
            <WorkstationInstall release={release} />
          </div>

          <div className="mt-8 flex flex-col gap-3 border border-border bg-muted/25 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Prefer browsing every release artifact?</p>
              <p className="mt-1 text-xs leading-6 text-muted-foreground">Use GitHub when you need older versions, checksums, or non-default packages.</p>
            </div>
            <Button asChild variant="outline" size="lg" className="h-11 px-4 text-sm font-semibold">
              <a href={releaseUrl} target="_blank" rel="noopener noreferrer">
                Release page
                <ArrowUpRightIcon data-icon="inline-end" className="size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <RcDownloadSection cliRelease={cliRelease} />
      <InstallationTopology />
      <HelpPanel />
    </main>
  );
}
