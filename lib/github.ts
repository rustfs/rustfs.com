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

const GITHUB_API_BASE = 'https://api.github.com/repos/rustfs/rustfs';

/**
 * 获取最新版本信息（包括预发布版本）
 * @returns Promise<GitHubRelease | null>
 */
export async function getLatestRelease(): Promise<GitHubRelease | null> {
  try {
    // 先尝试获取最新的正式版本
    let response = await fetch(`${GITHUB_API_BASE}/releases/latest`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      // 缓存 1 小时
      next: {
        revalidate: 3600
      }
    });

    // 如果正式版本不存在（404），获取有资产文件的最新版本
    if (!response.ok && response.status === 404) {
      console.info('No stable release found, fetching latest prerelease with assets...');

      response = await fetch(`${GITHUB_API_BASE}/releases?per_page=10`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        },
        // 缓存 1 小时
        next: {
          revalidate: 3600
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch releases:', response.status, response.statusText);
        return null;
      }

      const releases: GitHubRelease[] = await response.json();

      if (!releases || releases.length === 0) {
        console.error('No releases found');
        return null;
      }

      // 优先返回有资产文件的最新非草稿版本
      const releaseWithAssets = releases.find(release =>
        !release.draft && release.assets && release.assets.length > 0
      );

      if (releaseWithAssets) {
        return releaseWithAssets;
      }

      // 如果没有找到有资产的版本，返回最新的非草稿版本
      const latestRelease = releases.find(release => !release.draft);
      return latestRelease || null;
    }

    if (!response.ok) {
      console.error('Failed to fetch latest release:', response.status, response.statusText);
      return null;
    }

    const data: GitHubRelease = await response.json();

    // 过滤掉草稿版本（但允许预发布版本）
    if (data.draft) {
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching latest release:', error);
    return null;
  }
}

/**
 * 格式化版本号
 * @param version 版本号字符串
 * @returns 格式化后的版本号
 */
export function formatVersion(version: string): string {
  // 移除 'v' 前缀（如果有的话）
  const cleanVersion = version.replace(/^v/, '');

  // 确保版本号格式正确
  const versionPattern = /^\d+\.\d+\.\d+/;
  if (!versionPattern.test(cleanVersion)) {
    return version;
  }

  return `v${cleanVersion}`;
}

/**
 * 格式化发布日期
 * @param dateString ISO 日期字符串
 * @param locale 语言区域，默认为中文
 * @returns 格式化后的日期
 */
export function formatReleaseDate(dateString: string, locale: string = 'zh-CN'): string {
  try {
    const date = new Date(dateString);

    // 根据语言区域选择合适的格式
    if (locale === 'en' || locale.startsWith('en-')) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } else {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * 获取版本的下载链接
 * @param release GitHub 发布信息
 * @param platform 平台标识
 * @returns 下载链接或 null
 */
export function getDownloadUrlForPlatform(
  release: GitHubRelease,
  platform: string
): string | null {
  if (!release.assets || release.assets.length === 0) {
    return null;
  }

  // 根据平台匹配文件名模式
  const platformPatterns: Record<string, RegExp[]> = {
    windows: [/windows/i, /win/i, /\.exe$/i],
    linux: [/linux/i, /x86_64.*linux/i, /\.tar\.gz$/i],
    macos: [/darwin/i, /macos/i, /apple/i, /\.dmg$/i],
    docker: [/docker/i]
  };

  const patterns = platformPatterns[platform];
  if (!patterns) {
    return null;
  }

  for (const asset of release.assets) {
    for (const pattern of patterns) {
      if (pattern.test(asset.name)) {
        return asset.browser_download_url;
      }
    }
  }

  return null;
}
