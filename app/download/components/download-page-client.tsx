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

function findReleaseAsset(
  release: GitHubRelease | null,
  patterns: RegExp[],
  fallbackName: string,
) {
  const asset = release?.assets.find((candidate) =>
    patterns.some((pattern) => pattern.test(candidate.name))
  );

  return {
    url: asset?.browser_download_url ?? release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest',
    filename: asset?.name ?? fallbackName,
    isDirect: Boolean(asset),
  };
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
  const version = release?.tag_name ? formatVersion(release.tag_name) : 'Latest';

  return (
    <a
      href={releaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="motion-card group relative block overflow-hidden border border-border bg-card/90 transition-colors hover:border-foreground/40"
      aria-label="Open current RustFS server release on GitHub"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-72 opacity-45 [background-image:repeating-linear-gradient(135deg,transparent_0_18px,var(--border)_18px_19px,transparent_19px_36px)] lg:block"
      />
      <div className="relative grid border-b border-border text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:grid-cols-[1fr_auto]">
        <span className="px-4 py-3">Current server release</span>
        <span className="inline-flex items-center gap-2 border-t border-border px-4 py-3 text-foreground transition-colors group-hover:text-brand sm:border-l sm:border-t-0">
          GitHub
          <ArrowUpRightIcon className="size-3.5" />
        </span>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div className="p-5 sm:p-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Release channel</p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Version</p>
              <p className="mt-2 font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">
                {version}
              </p>
            </div>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
              Open release
              <ArrowUpRightIcon className="motion-arrow size-4" />
            </span>
          </div>
          <div className="mt-6 grid gap-px bg-border sm:grid-cols-3">
            {['Server binary', 'Docker image', 'Source archive'].map((item) => (
              <span
                key={item}
                className="bg-background/65 px-3 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="grid border-t border-border bg-background/35 lg:border-l lg:border-t-0">
          {[
            ['Published', publishedAt],
            ['Artifacts', release?.assets?.length ? `${release.assets.length} files` : 'Release page'],
            ['Destination', 'GitHub releases'],
          ].map(([label, value]) => (
            <div key={label} className="grid grid-cols-[8.5rem_1fr] border-b border-border last:border-b-0">
              <span className="border-r border-border px-4 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {label}
              </span>
              <span className="px-4 py-4 text-sm font-semibold text-foreground">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </a>
  );
}

type InstallCardVariant = 'binary' | 'container' | 'compose' | 'cluster' | 'workstation';

function InstallCardVisual({ variant }: { variant: InstallCardVariant }) {
  if (variant === 'binary') {
    return (
      <div className="border-b border-border bg-background/50 p-4">
        <div className="grid gap-px bg-border sm:grid-cols-4">
          {['MUSL', 'GNU', 'ARM64', 'x86_64'].map((item) => (
            <span key={item} className="bg-card px-3 py-3 text-center font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'container') {
    return (
      <div className="grid border-b border-border bg-background/50 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:grid-cols-3">
        <span className="border-b border-border px-4 py-4 sm:border-b-0 sm:border-r">9000 S3</span>
        <span className="border-b border-border px-4 py-4 sm:border-b-0 sm:border-r">9001 UI</span>
        <span className="px-4 py-4">Volume /data</span>
      </div>
    );
  }

  if (variant === 'compose') {
    return (
      <div className="relative h-28 overflow-hidden border-b border-border bg-background/50 p-4">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,var(--border)_1px,transparent_1px),linear-gradient(0deg,var(--border)_1px,transparent_1px)] [background-size:28px_28px]"
        />
        <div className="relative flex h-full items-center gap-3">
          {['compose.yml', 'volume', 'ports'].map((item, index) => (
            <span
              key={item}
              className="grid h-14 flex-1 place-items-center border border-border bg-card font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
              style={{ transform: `translateY(${index === 1 ? -8 : index === 2 ? 8 : 0}px)` }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'cluster') {
    return (
      <div className="relative h-28 overflow-hidden border-b border-border bg-background/50 p-4">
        <span className="absolute left-10 right-10 top-1/2 h-px bg-border" />
        <div className="relative flex h-full items-center justify-between">
          {[1, 2, 3].map((node) => (
            <span key={node} className="grid size-14 place-items-center border border-border bg-card font-mono text-[10px] font-semibold text-muted-foreground">
              pod.{node}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-border bg-background/50 p-4">
      <div className="flex flex-wrap gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
        {['macOS', 'Windows', 'Apple Silicon', 'Intel'].map((item) => (
          <span key={item} className="border border-border bg-card px-3 py-2">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function InstallCard({
  icon: Icon,
  label,
  title,
  description,
  variant,
  children,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  title: string;
  description: string;
  variant: InstallCardVariant;
  children: ReactNode;
}) {
  return (
    <article className="motion-card relative flex min-w-0 flex-col overflow-hidden border border-border bg-card">
      <div className="relative flex items-start gap-4 overflow-hidden border-b border-border p-5">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 hidden w-40 opacity-45 [background-image:repeating-linear-gradient(135deg,transparent_0_14px,var(--border)_14px_15px,transparent_15px_28px)] sm:block"
        />
        <span className="motion-icon-tile relative flex size-12 shrink-0 items-center justify-center bg-brand text-brand-foreground">
          <Icon className="size-5" />
        </span>
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{label}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-tight text-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
        </div>
      </div>
      <InstallCardVisual variant={variant} />
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
  const x86Musl = findReleaseAsset(release, [/rustfs-linux-x86_64-musl.*\.zip/i], 'rustfs-linux-x86_64-musl-latest.zip');
  const x86Gnu = findReleaseAsset(release, [/rustfs-linux-x86_64-gnu.*\.zip/i], 'rustfs-linux-x86_64-gnu-latest.zip');
  const armMusl = findReleaseAsset(release, [/rustfs-linux-aarch64-musl.*\.zip/i], 'rustfs-linux-aarch64-musl-latest.zip');
  const armGnu = findReleaseAsset(release, [/rustfs-linux-aarch64-gnu.*\.zip/i], 'rustfs-linux-aarch64-gnu-latest.zip');

  return (
    <InstallCard
      icon={BinaryIcon}
      label="Recommended for servers"
      title="Linux binary"
      description="Use this path when you want a small, direct RustFS server binary and a system service under your control."
      variant="binary"
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
          href={x86Musl.url}
          label="x86_64 MUSL"
          icon={<LinuxIcon className="size-4" />}
        />
        <ArtifactButton
          href={x86Gnu.url}
          label="x86_64 GNU"
          icon={<LinuxIcon className="size-4" />}
        />
        <ArtifactButton
          href={armMusl.url}
          label="ARM64 MUSL"
          icon={<LinuxIcon className="size-4" />}
        />
        <ArtifactButton
          href={armGnu.url}
          label="ARM64 GNU"
          icon={<LinuxIcon className="size-4" />}
        />
      </div>

      <CodeBlock
        title="Manual install"
        code={[
          `curl -L -O ${x86Musl.url}`,
          `unzip ${x86Musl.filename}`,
          'chmod +x rustfs',
          'sudo install -m 755 rustfs /usr/local/bin/rustfs',
          'rustfs --version',
        ]}
      />

      <p className="text-xs leading-6 text-muted-foreground">
        Pick GNU for glibc-based systems and MUSL for a more portable static binary. ARM64 follows the same flow with <code className="text-foreground">{armMusl.filename}</code>.
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
      variant="container"
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
      variant="compose"
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
      variant="cluster"
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
      variant="workstation"
    >
      <div className="flex flex-wrap gap-2">
        <PlatformBadge icon={<AppleIcon className="size-4" />} label="macOS" />
        <PlatformBadge icon={<WindowsIcon className="size-4" />} label="Windows" />
      </div>

      <CodeBlock
        title="macOS Homebrew"
        code={[
          'brew tap rustfs/homebrew-tap',
          'brew install rustfs',
          'rustfs --version',
        ]}
      />

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
          <a
            href="https://github.com/rustfs/rustfs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group border-b border-border p-6 transition-colors hover:bg-muted/40 md:border-b-0 md:border-r"
          >
            <MessageCircleIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Report an issue</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Share compatibility feedback, installation friction, or operational questions.</p>
            <ArrowUpRightIcon className="motion-arrow mt-8 size-5 text-brand" />
          </a>
          <a
            href="https://discord.gg/NcKBCEJp6P"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group p-6 transition-colors hover:bg-muted/40"
          >
            <ServerIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Join Discord</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Discuss installation, operations, and migration questions with the RustFS community.</p>
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
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Download surface</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
                Install RustFS for real deployments.
              </h1>
            </div>
            <div className="flex flex-col gap-6">
              <p className="max-w-2xl text-base leading-8 text-muted-foreground lg:ml-auto">
                Choose binary, container, Kubernetes, or rc CLI paths with commands kept close to each deployment decision.
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
