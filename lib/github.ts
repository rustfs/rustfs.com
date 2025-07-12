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
 * Get download link for a version
 * @param release GitHub release information
 * @param platform Platform identifier
 * @returns Download link or null
 */
export function getDownloadUrlForPlatform(
  release: GitHubRelease,
  platform: string
): string | null {
  if (!release.assets || release.assets.length === 0) {
    return null;
  }

  // Match filename pattern based on platform
  const platformPatterns: Record<string, RegExp> = {
    windows: /windows/i,
    linux: /linux/i,
    macos: /darwin/i,
    docker: /docker/i
  };

  const patterns = platformPatterns[platform];
  if (!patterns) {
    return null;
  }

  for (const asset of release.assets) {
    if (patterns.test(asset.name)) {
      return asset.browser_download_url;
    }
  }

  return null;
}
