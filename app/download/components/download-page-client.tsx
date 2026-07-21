'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
import { useState, type ComponentType, type KeyboardEvent, type ReactNode } from 'react'
import CodeBlock from './code-block'
import InstallationTopology from './installation-topology'
import RcDownloadSection from './rc-download-section'

interface DownloadPageClientProps {
  release: GitHubRelease | null;
  cliRelease: GitHubRelease | null;
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
    url: asset?.browser_download_url ?? release?.html_url ?? 'https://github.com/rustfs/rustfs/releases',
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
    <div className="border-t border-border pt-10">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">
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
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases';
  const publishedAt = release?.published_at ? formatReleaseDate(release.published_at, 'en-US') : 'Select on GitHub';
  const version = release?.tag_name ? formatVersion(release.tag_name) : 'Choose a beta';
  const channel = !release
    ? 'Release list'
    : /preview/i.test(release.tag_name)
    ? 'Preview build'
    : release?.prerelease
      ? 'Recommended beta'
      : 'Stable release';

  return (
    <a
      href={releaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="motion-card group relative grid overflow-hidden border border-border bg-card/90 transition-colors hover:border-foreground/40 lg:grid-cols-[1fr_auto]"
      aria-label="Open current RustFS server release on GitHub"
    >
      <div className="relative p-5 sm:p-6">
        <div className="mb-5 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-brand">{channel}</span>
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
              Server binary, Docker image, and source archive. Review release notes before upgrading.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Open release
            <ArrowUpRightIcon className="motion-arrow size-4" />
          </span>
        </div>
      </div>

      <div className="grid border-t border-border bg-background/35 lg:w-52 lg:border-l lg:border-t-0">
        <span className="grid gap-1 border-b border-border px-4 py-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Artifacts
          </span>
          <span className="text-sm font-semibold text-foreground">
            {release?.assets?.length ? `${release.assets.length} files` : 'Release page'}
          </span>
        </span>
        <span className="grid gap-1 px-4 py-4">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Destination
          </span>
          <span className="text-sm font-semibold text-foreground">
            GitHub
          </span>
        </span>
      </div>
    </a>
  );
}

function HeroStripeCard({ releaseUrl }: { releaseUrl: string }) {
  return (
    <a
      href={releaseUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block border-y border-border py-4 transition-colors hover:border-foreground/35"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-50 [background-image:repeating-linear-gradient(135deg,transparent_0_18px,var(--border)_18px_19px,transparent_19px_36px)]"
      />
      <div className="relative flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
          Platform packages
        </p>

        <div className="grid gap-3">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            <PlatformBadge icon={<LinuxIcon className="size-4" />} label="Linux" />
            <PlatformBadge icon={<DockerIcon className="size-4" />} label="Docker" />
            <PlatformBadge icon={<AppleIcon className="size-4" />} label="macOS" />
            <PlatformBadge icon={<WindowsIcon className="size-4" />} label="Windows" />
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand">
            Open GitHub releases
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
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
      <span className="size-4 text-foreground">{icon}</span>
      {label}
    </span>
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
  const fallbackUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases';
  const serverTag = release?.tag_name.replace(/^v/, '') ?? '<beta-version>';
  const paths: ServerInstallPath[] = [
    {
      id: 'linux',
      label: 'Linux binary',
      title: 'Install directly on a server',
      summary: 'Best when RustFS should run as a small native service with explicit control over disks and systemd.',
      bestFor: 'Bare metal and VM evaluation',
      Icon: BinaryIcon,
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
        `docker run -d --name rustfs -p 9000:9000 -p 9001:9001 -v rustfs-data:/data rustfs/rustfs:${serverTag} /data`,
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
      Icon: CloudIcon,
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
      Icon: HardDriveIcon,
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
    <div className="overflow-hidden border-y border-border">
      <div className="grid lg:grid-cols-[18rem_1fr]">
        <div className="border-b border-border bg-background/40 lg:border-b-0 lg:border-r">
          <div className="border-b border-border p-5">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-brand">Choose one path</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Pick the environment first. Only the matching command stays visible.</p>
          </div>
          <div className="grid" role="tablist" aria-label="Server install paths">
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
                    "group grid grid-cols-[2.5rem_1fr] gap-3 border-b border-border border-l-2 border-l-transparent px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-muted/35",
                    isActive && "border-l-brand bg-brand/10"
                  )}
                >
                  <span className="motion-icon-tile flex size-10 items-center justify-center text-brand">
                    <Icon className="size-5" />
                  </span>
                  <span>
                    <span className={cn("block text-sm font-semibold text-foreground", isActive && "text-brand")}>{path.label}</span>
                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">{path.bestFor}</span>
                  </span>
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
    </div>
  );
}

function HelpPanel() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Support surface"
          title="Need a production readiness review?"
          description="Move from local validation toward production only after reviewing compatibility, topology, operations, and the current beta status."
        />

        <div className="grid gap-8 border-y border-border py-8 md:grid-cols-3">
          <a
            href="https://docs.rustfs.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="motion-card group border-t border-border pt-5 transition-colors hover:border-foreground/35"
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
            className="motion-card group border-t border-border pt-5 transition-colors hover:border-foreground/35"
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
            className="motion-card group border-t border-border pt-5 transition-colors hover:border-foreground/35"
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
  const releaseUrl = release?.html_url ?? 'https://github.com/rustfs/rustfs/releases';

  return (
    <main className="relative z-10 min-h-[100dvh] text-foreground">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">Public beta / download</p>
              <h1 className="mt-5 max-w-4xl font-display text-4xl font-extrabold leading-tight text-foreground sm:text-6xl">
                Evaluate RustFS, then plan the deployment.
              </h1>
            </div>
            <HeroStripeCard releaseUrl={releaseUrl} />
          </div>

          <div className="mt-12">
            <ReleasePanel release={release} />
            <div className="grid gap-3 border-b border-border py-5 text-xs leading-6 sm:grid-cols-[1fr_auto] sm:items-center">
              <p className="text-muted-foreground">
                RustFS is in public beta. Validate required S3 operations, recovery behavior, and upgrade procedures before storing durable production data.
              </p>
              <a
                className="font-semibold text-foreground hover:text-brand"
                href="https://github.com/rustfs/rustfs#feature--status"
                target="_blank"
                rel="noopener noreferrer"
              >
                Review feature status ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Server install paths"
            title="Start small, then validate the operating model."
            description="Choose the environment first, copy the exact command, and record what the path does and does not prove."
          />

          <ServerInstallTabs release={release} />

          <div className="mt-10 flex flex-col gap-4 border-y border-border py-5 sm:flex-row sm:items-center sm:justify-between">
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
