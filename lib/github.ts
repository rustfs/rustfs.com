export interface GitHubRelease {
  tag_name: string;
  name: string;
  published_at: string;
  html_url: string;
  prerelease: boolean;
  draft: boolean;
  assets: {
    name: string;
    browser_download_url: string;
    size: number;
  }[];
}

export interface GitHubMetrics {
  stars: number;
  forks: number;
  commits: number;
}

/**
 * Get the latest release information (including pre-releases)
 * @returns Promise<GitHubRelease | null>
 */
export async function getLatestRelease(): Promise<GitHubRelease | null> {
  // Try to get the latest official release first
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/rustfs/releases/latest',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'RustFS-Website'
        },
        // Cache for 1 hour
        next: { revalidate: 3600 }
      }
    )

    if (response.ok) {
      const release = await response.json()
      return release
    }
  } catch (error) {
    console.warn('Failed to fetch latest release:', error)
  }

  // If official release doesn't exist (404), get the latest version with assets
  try {
    const response = await fetch(
      'https://api.github.com/repos/rustfs/rustfs/releases?per_page=10',
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'RustFS-Website'
        },
        // Cache for 1 hour
        next: { revalidate: 3600 }
      }
    )

    if (response.ok) {
      const releases = await response.json()

      // Prioritize latest non-draft version with assets
      const releaseWithAssets = releases.find((release: GitHubRelease) =>
        !release.draft && release.assets && release.assets.length > 0
      )

      if (releaseWithAssets) {
        return releaseWithAssets
      }

      // If no version with assets found, return latest non-draft version
      const latestNonDraft = releases.find((release: GitHubRelease) => !release.draft)
      return latestNonDraft || null
    }
  } catch (error) {
    console.error('Failed to fetch releases:', error)
  }

  return null
}

/**
 * Get GitHub repository metrics (stars, forks, commits) at build time
 * @returns Promise<GitHubMetrics>
 */
export async function getGitHubMetrics(): Promise<GitHubMetrics> {
  const fallback: GitHubMetrics = {
    stars: 11000,
    forks: 500,
    commits: 2000,
  };

  try {
    const [repoRes, commitsRes] = await Promise.all([
      fetch('https://api.github.com/repos/rustfs/rustfs', {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'RustFS-Website',
        },
        next: { revalidate: 3600 },
      }),
      fetch('https://api.github.com/repos/rustfs/rustfs/commits?per_page=1', {
        headers: {
          Accept: 'application/vnd.github+json',
          'User-Agent': 'RustFS-Website',
        },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!repoRes.ok || !commitsRes.ok) {
      return fallback;
    }

    const repo = await repoRes.json() as { stargazers_count?: number; forks_count?: number };
    const link = commitsRes.headers.get('link');
    let commits = 0;

    const match = link?.match(/page=(\d+)>; rel="last"/);
    if (match?.[1]) {
      commits = Number(match[1]);
    } else {
      const data = await commitsRes.json();
      commits = Array.isArray(data) ? data.length : 0;
    }

    return {
      stars: repo.stargazers_count ?? fallback.stars,
      forks: repo.forks_count ?? fallback.forks,
      commits: Number.isFinite(commits) && commits > 0 ? commits : fallback.commits,
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub metrics:', error);
    return fallback;
  }
}

/**
 * Format version number
 * @param version Version string
 * @returns Formatted version number
 */
export function formatVersion(version: string): string {
  // Remove 'v' prefix if present
  const cleanVersion = version.startsWith('v') ? version.slice(1) : version

  // Ensure version format is correct
  const versionMatch = cleanVersion.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/)
  if (!versionMatch) {
    return version;
  }

  return `v${cleanVersion}`;
}

/**
 * Format release date
 * @param dateString ISO date string
 * @param locale Language locale, default to Chinese
 * @returns Formatted date
 */
export function formatReleaseDate(dateString: string, locale: string = 'zh-CN'): string {
  try {
    const date = new Date(dateString);

    // Select appropriate format based on language locale
    const formatter = new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return formatter.format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Get latest version string at build time
 * @returns Promise<string> Version string (e.g., "v1.0.0") or fallback
 */
export async function getLatestVersion(): Promise<string> {
  const fallback = 'v1.0.0';

  try {
    const release = await getLatestRelease();
    if (release && release.tag_name) {
      return release.tag_name.startsWith('v') ? release.tag_name : `v${release.tag_name}`;
    }
  } catch (error) {
    console.warn('Failed to fetch latest version:', error);
  }

  return fallback;
}

/**
 * Get download link for a version
 * @param release GitHub release information
 * @param platform Platform identifier
 * @param arch Optional architecture (e.g., 'x86_64', 'aarch64')
 * @returns Download link or null
 */
export function getDownloadUrlForPlatform(
  release: GitHubRelease,
  platform: string,
  arch?: string
): string | null {
  if (!release.assets || release.assets.length === 0) {
    return null;
  }

  // Match filename pattern based on platform and architecture
  const platformPatterns: Record<string, RegExp[]> = {
    windows: [
      /rustfs-windows-x86_64.*\.exe/i,
      /windows.*x86_64.*\.exe/i,
      /windows/i
    ],
    linux: arch === 'aarch64'
      ? [
        /rustfs-linux-aarch64.*\.zip/i,
        /linux.*aarch64.*\.zip/i,
        /linux.*arm64.*\.zip/i
      ]
      : [
        /rustfs-linux-x86_64.*\.zip/i,
        /linux.*x86_64.*\.zip/i,
        /linux/i
      ],
    macos: arch === 'aarch64' || arch === 'arm64'
      ? [
        /rustfs-macos-aarch64.*\.zip/i,
        /macos.*aarch64.*\.zip/i,
        /macos.*arm64.*\.zip/i,
        /darwin.*aarch64/i
      ]
      : [
        /rustfs-macos-x86_64.*\.zip/i,
        /macos.*x86_64.*\.zip/i,
        /darwin.*x86_64/i,
        /darwin/i
      ],
    docker: [/docker/i]
  };

  const patterns = platformPatterns[platform];
  if (!patterns) {
    return null;
  }

  // Try patterns in order of specificity
  for (const pattern of patterns) {
    for (const asset of release.assets) {
      if (pattern.test(asset.name)) {
        return asset.browser_download_url;
      }
    }
  }

  return null;
}
