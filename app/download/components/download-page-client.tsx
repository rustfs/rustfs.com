'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { formatReleaseDate, formatVersion, getDownloadUrlForPlatform, type GitHubRelease } from '@/lib/github'
import AppleIcon from '@/public/svgs/brands/apple.svg'
import DockerIcon from '@/public/svgs/brands/docker.svg'
import KubernetesIcon from '@/public/svgs/brands/kubernetes.svg'
import LinuxIcon from '@/public/svgs/brands/linux.svg'
import WindowsIcon from '@/public/svgs/brands/windows.svg'
import Link from 'next/link'
import {
    ArrowLeftIcon,
    ArrowUpRightIcon,
    BookOpenIcon,
    DownloadIcon,
    LayersIcon,
    MessageCircleIcon,
    MonitorIcon,
    ServerIcon,
    TerminalIcon,
} from 'lucide-react'
import { useState, type ComponentType, type KeyboardEvent, type ReactNode } from 'react'
import CodeBlock from './code-block'
import InstallationTopology from './installation-topology'

interface ServerDownloadPageProps {
  release: GitHubRelease | null;
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
    <div>
      <div className="mb-8 max-w-4xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
        <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductDownloadLink({
  href,
  eyebrow,
  title,
  description,
  methods,
  Icon,
}: {
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  methods: string[];
  Icon: ComponentType<{ className?: string }>;
}) {
  return (
    <Link
      href={href}
      className="motion-card group flex min-h-80 flex-col border border-border bg-card px-6 py-8 transition-colors hover:bg-muted/20 sm:px-8"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">{eyebrow}</p>
          <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>
        </div>
        <span className="motion-icon-tile flex size-11 shrink-0 items-center justify-center text-brand">
          <Icon className="size-6" />
        </span>
      </div>

      <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>

      <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3">
        {methods.map((method) => (
          <span key={method} className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {method}
          </span>
        ))}
      </div>

      <span className="mt-auto inline-flex items-center gap-2 pt-10 text-sm font-semibold text-brand">
        Choose install method
        <ArrowUpRightIcon className="motion-arrow size-4" />
      </span>
    </Link>
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
      <div className="relative p-5 sm:p-6">
        <div className="mb-5 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-brand">Current server release</span>
          <span>{'//'}</span>
          <span className="h-px bg-border" />
          <span>{publishedAt}</span>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-4xl font-semibold leading-none text-foreground sm:text-5xl">
              {version}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              Server binary, Docker image, and source archive.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Open release
            <ArrowUpRightIcon className="motion-arrow size-4" />
          </span>
        </div>
      </div>
    </a>
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
    <Button
      asChild
      variant="outline"
      size="lg"
      className="h-11 w-full justify-between border-border bg-card px-4 text-sm font-semibold text-foreground dark:border-border dark:bg-card"
    >
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

type ServerInstallPath = {
  id: string;
  label: string;
  title: string;
  summary: string;
  bestFor: string;
  Icon: ComponentType<{ className?: string }>;
  commandTitle: string;
  command: string[];
  chips: string[];
  actions?: {
    href: string;
    label: string;
    icon: ReactNode;
  }[];
};

function ServerInstallTabs({ release }: { release: GitHubRelease | null }) {
  const x86Musl = findReleaseAsset(release, [/rustfs-linux-x86_64-musl.*\.zip/i], 'rustfs-linux-x86_64-musl-latest.zip');
  const x86Gnu = findReleaseAsset(release, [/rustfs-linux-x86_64-gnu.*\.zip/i], 'rustfs-linux-x86_64-gnu-latest.zip');
  const armMusl = findReleaseAsset(release, [/rustfs-linux-aarch64-musl.*\.zip/i], 'rustfs-linux-aarch64-musl-latest.zip');
  const armGnu = findReleaseAsset(release, [/rustfs-linux-aarch64-gnu.*\.zip/i], 'rustfs-linux-aarch64-gnu-latest.zip');
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
  const paths: ServerInstallPath[] = [
    {
      id: 'linux',
      label: 'Linux binary',
      title: 'Install directly on a server',
      summary: 'Best when RustFS should run as a small native service with explicit control over disks and systemd.',
      bestFor: 'Production hosts, bare metal, VMs',
      Icon: LinuxIcon,
      commandTitle: 'Fast validation',
      command: [
        'curl -O https://rustfs.com/install_rustfs.sh && bash install_rustfs.sh',
        'mkdir -p ~/rustfs-data',
        'rustfs ~/rustfs-data',
      ],
      chips: ['MUSL / GNU', 'x86_64 / ARM64', 'system service'],
      actions: [
        { href: x86Musl.url, label: 'x86_64 MUSL', icon: <LinuxIcon className="size-4" /> },
        { href: x86Gnu.url, label: 'x86_64 GNU', icon: <LinuxIcon className="size-4" /> },
        { href: armMusl.url, label: 'ARM64 MUSL', icon: <LinuxIcon className="size-4" /> },
        { href: armGnu.url, label: 'ARM64 GNU', icon: <LinuxIcon className="size-4" /> },
      ],
    },
    {
      id: 'docker',
      label: 'Docker',
      title: 'Run a persistent container',
      summary: 'Use Docker for local validation, S3 client testing, and a clean disposable runtime.',
      bestFor: 'Local dev, demos, smoke tests',
      Icon: DockerIcon,
      commandTitle: 'Single-node container',
      command: [
        'docker volume create rustfs-data',
        'docker run -d --name rustfs -p 9000:9000 -p 9001:9001 -v rustfs-data:/data rustfs/rustfs:latest /data',
        'docker logs -f rustfs',
      ],
      chips: ['9000 S3 API', '9001 Console', '/data volume'],
    },
    {
      id: 'compose',
      label: 'Compose',
      title: 'Keep a repeatable lab stack',
      summary: 'Use Compose when the setup should live in source control and be reproduced by teammates.',
      bestFor: 'Team labs, reproducible local stacks',
      Icon: LayersIcon,
      commandTitle: 'Compose stack',
      command: [
        'mkdir rustfs-compose && cd rustfs-compose',
        'curl -O https://rustfs.com/docker-compose.yml',
        'docker compose up -d',
      ],
      chips: ['compose.yml', 'named volume', 'fixed ports'],
    },
    {
      id: 'kubernetes',
      label: 'Kubernetes',
      title: 'Install with Helm',
      summary: 'Use Helm for cloud-native deployment, GitOps review, and repeatable cluster configuration.',
      bestFor: 'Kubernetes, GitOps, cluster rollout',
      Icon: KubernetesIcon,
      commandTitle: 'Helm install',
      command: [
        'helm repo add rustfs https://charts.rustfs.com',
        'helm repo update',
        'helm install rustfs rustfs/rustfs --namespace rustfs --create-namespace',
      ],
      chips: ['StatefulSet', 'PVC backed', 'Ingress ready'],
    },
    {
      id: 'workstation',
      label: 'macOS / Windows',
      title: 'Validate from a workstation',
      summary: 'Use workstation binaries for client testing, demos, and compatibility checks outside Linux servers.',
      bestFor: 'Client validation, isolated testing',
      Icon: MonitorIcon,
      commandTitle: 'macOS Homebrew',
      command: [
        'brew tap rustfs/homebrew-tap',
        'brew install rustfs',
        'rustfs --version',
      ],
      chips: ['macOS', 'Windows', 'Apple Silicon'],
      actions: [
        { href: macArmUrl ?? fallbackUrl, label: 'Apple Silicon', icon: <AppleIcon className="size-4" /> },
        { href: macX86Url ?? fallbackUrl, label: 'macOS Intel', icon: <AppleIcon className="size-4" /> },
        { href: windowsUrl ?? fallbackUrl, label: 'Windows x86_64', icon: <WindowsIcon className="size-4" /> },
      ],
    },
  ];
  const [activePathId, setActivePathId] = useState(paths[0].id);
  const activePath = paths.find((path) => path.id === activePathId) ?? paths[0];
  const ActiveIcon = activePath.Icon;

  const handlePathKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % paths.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + paths.length) % paths.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = paths.length - 1;
    } else {
      return;
    }

    event.preventDefault();
    setActivePathId(paths[nextIndex].id);
    event.currentTarget.parentElement
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [nextIndex]?.focus();
  };

  return (
    <div className="overflow-hidden border border-border bg-card">
      <div className="overflow-x-auto border-b border-border bg-background/40">
        <div className="flex min-w-max" role="tablist" aria-label="Server install paths">
          {paths.map((path, index) => {
            const Icon = path.Icon;
            const isActive = path.id === activePath.id;

            return (
              <button
                key={path.id}
                type="button"
                role="tab"
                id={`install-path-tab-${path.id}`}
                aria-selected={isActive}
                aria-controls={`install-path-${path.id}`}
                onClick={() => setActivePathId(path.id)}
                onKeyDown={(event) => handlePathKeyDown(event, index)}
                tabIndex={isActive ? 0 : -1}
                className={cn(
                  "group flex min-h-14 items-center gap-2 border-b-2 border-b-transparent px-5 text-sm font-semibold text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground",
                  isActive && "border-b-brand bg-brand/10 text-brand"
                )}
              >
                <Icon className="size-4" />
                {path.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        id={`install-path-${activePath.id}`}
        role="tabpanel"
        aria-labelledby={`install-path-tab-${activePath.id}`}
        className="min-w-0"
      >
        <div className="grid gap-6 border-b border-border p-5 sm:p-6 lg:grid-cols-[1fr_auto] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <span className="motion-icon-tile flex size-5 items-center justify-center text-brand">
                <ActiveIcon className="size-4" />
              </span>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">{activePath.label}</p>
            </div>
            <h3 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{activePath.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{activePath.summary}</p>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{activePath.bestFor}</p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-3 lg:max-w-72 lg:justify-end">
            {activePath.chips.map((chip) => (
              <span key={chip} className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-6">
          <CodeBlock
            title={activePath.commandTitle}
            code={activePath.command}
            className="border-brand/60 shadow-[0_0_0_1px_rgba(39,112,246,0.18),0_18px_60px_rgba(39,112,246,0.12)]"
          />

          {activePath.actions ? (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {activePath.actions.map((action) => (
                <ArtifactButton
                  key={action.label}
                  href={action.href}
                  label={action.label}
                  icon={action.icon}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function HelpPanel() {
  return (
    <section className="pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Support surface"
          title="Need a production deployment path?"
          description="Move from local validation to production with documentation, community help, or direct planning support."
        />

        <div className="grid gap-4 md:grid-cols-3">
          <a
            href="https://docs.rustfs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <BookOpenIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Read the docs</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Configuration, deployment, S3 clients, and operations guidance.</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
          <a
            href="https://github.com/rustfs/rustfs/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <MessageCircleIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Report an issue</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Share compatibility feedback, installation friction, or operational questions.</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
          <a
            href="https://discord.gg/NcKBCEJp6P"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group flex min-h-72 flex-col border border-border bg-card p-6 transition-colors hover:bg-muted/30 sm:p-7"
          >
            <ServerIcon className="motion-icon-tile size-5 text-brand" />
            <h3 className="mt-6 text-xl font-semibold text-foreground">Join Discord</h3>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">Discuss installation, operations, and migration questions with the RustFS community.</p>
            <ArrowUpRightIcon className="motion-arrow mt-auto size-5 text-brand" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function DownloadPageClient() {
  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="w-full font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
              Download RustFS
            </h1>
            <p className="mt-5 w-full text-sm leading-7 text-muted-foreground">
              Choose the product first, then use the install path that matches the environment where it runs.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <ProductDownloadLink
              href="/download/server"
              eyebrow="Data service"
              title="RustFS Server"
              description="Server binary, Docker image, and source archive."
              methods={['Linux', 'Docker', 'Compose', 'Kubernetes', 'macOS', 'Windows']}
              Icon={ServerIcon}
            />
            <ProductDownloadLink
              href="/download/cli"
              eyebrow="Admin CLI"
              title="RustFS CLI (rc)"
              description="Use rc for bucket, object, cluster, identity, and operational workflows."
              methods={['Homebrew', 'Scoop', 'Linux', 'macOS', 'Windows', 'Docker', 'Source']}
              Icon={TerminalIcon}
            />
          </div>
        </div>
      </section>

      <HelpPanel />
    </main>
  );
}

export function ServerDownloadPage({ release }: ServerDownloadPageProps) {
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases/latest';

  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/download"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon className="size-4" />
            All downloads
          </Link>

          <div className="mt-10 max-w-4xl">
            <h1 className="max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl">
              RustFS Server
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-foreground sm:text-xl">
              Start small, then keep the same operating model.
            </p>
          </div>

          <div className="mt-12">
            <ReleasePanel release={release} />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ServerInstallTabs release={release} />

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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

      <InstallationTopology />
    </main>
  );
}
