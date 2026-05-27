#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { argv } from 'node:process'
import { pathToFileURL } from 'node:url'

interface GitHubRepo {
  stargazers_count: number
  subscribers_count: number
}

interface GitHubRelease {
  tag_name: string
}

interface DiscordInvite {
  approximate_member_count: number
}

export interface Stats {
  stars: number
  monthly_downloads: number
  contributors: number
  discord: number
  version: string
}

export interface FetchedStats {
  stars: number | null
  contributors: number | null
  version: string | null
  downloads: number | null
  discord: number | null
}

/**
 * Merge freshly-fetched values with the previous stats: any field that failed
 * to fetch (null) falls back to the existing value, then a safe default. This
 * keeps `pnpm run update-stats` (and the deploy) from clobbering good data — or
 * failing — when one upstream API is down or rate-limited.
 */
export function resolveStats(
  fetched: FetchedStats,
  existing: Stats | null,
): Stats {
  return {
    stars: fetched.stars ?? existing?.stars ?? 0,
    monthly_downloads: fetched.downloads ?? existing?.monthly_downloads ?? 0,
    contributors: fetched.contributors ?? existing?.contributors ?? 0,
    discord: fetched.discord ?? existing?.discord ?? 0,
    version: fetched.version ?? existing?.version ?? '0.0.0',
  }
}

const GITHUB_OWNER = 'litestar-org'
const GITHUB_REPO = 'litestar'
const GITHUB_API_BASE = 'https://api.github.com'
const DISCORD_INVITE_CODE = 'litestar'
const STATS_FILE_PATH = resolve(import.meta.dirname, '../app/data/stats.json')

async function fetchGitHubData<T>(endpoint: string): Promise<T> {
  const url = `${GITHUB_API_BASE}${endpoint}`
  const headers: HeadersInit = {
    Accept: 'application/vnd.github.v3+json',
  }

  // Use GitHub token if available for higher rate limits
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const response = await fetch(url, { headers })

  if (!response.ok) {
    throw new Error(
      `GitHub API request failed: ${response.status} ${response.statusText}`,
    )
  }

  return response.json() as Promise<T>
}

async function getStarCount(): Promise<number | null> {
  try {
    const repo = await fetchGitHubData<GitHubRepo>(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
    )
    return repo.stargazers_count
  } catch (error) {
    console.warn('Failed to fetch star count, keeping existing value:', error)
    return null
  }
}

async function getContributorsCount(): Promise<number | null> {
  try {
    // GitHub API paginates contributors, but we can get the count from the Link header
    const url = `${GITHUB_API_BASE}/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors?per_page=1`
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    }

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const response = await fetch(url, { headers })

    if (!response.ok) {
      throw new Error(
        `GitHub API request failed: ${response.status} ${response.statusText}`,
      )
    }

    const linkHeader = response.headers.get('Link')
    if (linkHeader) {
      // Parse the Link header to get the last page number
      const matches = linkHeader.match(/page=(\d+)>; rel="last"/)
      if (matches && matches[1]) {
        return parseInt(matches[1], 10)
      }
    }

    // If no Link header, get all contributors and count them
    const contributors = await fetchGitHubData<unknown[]>(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contributors`,
    )
    return contributors.length
  } catch (error) {
    console.warn(
      'Failed to fetch contributors count, keeping existing value:',
      error,
    )
    return null
  }
}

async function getLatestVersion(): Promise<string | null> {
  try {
    const release = await fetchGitHubData<GitHubRelease>(
      `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
    )
    // Remove 'v' prefix if present
    return release.tag_name.replace(/^v/, '')
  } catch (error) {
    console.warn(
      'Failed to fetch latest version, keeping existing value:',
      error,
    )
    return null
  }
}

async function getPyPIDownloads(): Promise<number | null> {
  try {
    // PyPI stats API for monthly downloads
    const response = await fetch(
      `https://pypistats.org/api/packages/${GITHUB_REPO}/recent?period=month`,
    )

    if (!response.ok) {
      console.warn('Failed to fetch PyPI downloads, keeping existing value')
      return null
    }

    const data = (await response.json()) as {
      data: { last_month: number }
    }
    return data.data.last_month
  } catch (error) {
    console.warn('Error fetching PyPI downloads:', error)
    return null
  }
}

async function getDiscordMemberCount(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`,
    )

    if (!response.ok) {
      console.warn(
        'Failed to fetch Discord member count, keeping existing value',
      )
      return null
    }

    const data = (await response.json()) as DiscordInvite
    return data.approximate_member_count
  } catch (error) {
    console.warn('Error fetching Discord member count:', error)
    return null
  }
}

async function updateStats() {
  console.log('Fetching stats from GitHub, PyPI, and Discord...')

  // Each fetcher degrades to null on failure, so a single upstream outage or
  // rate-limit can no longer abort the whole run.
  const [stars, contributors, version, downloads, discord] = await Promise.all([
    getStarCount(),
    getContributorsCount(),
    getLatestVersion(),
    getPyPIDownloads(),
    getDiscordMemberCount(),
  ])

  // Read existing stats to preserve values if API calls fail
  let existingStats: Stats | null = null
  try {
    const { readFile } = await import('node:fs/promises')
    const existingData = await readFile(STATS_FILE_PATH, 'utf-8')
    existingStats = JSON.parse(existingData) as Stats
  } catch {
    console.log('No existing stats file found, creating new one')
  }

  const stats = resolveStats(
    { stars, contributors, version, downloads, discord },
    existingStats,
  )

  try {
    await writeFile(STATS_FILE_PATH, JSON.stringify(stats, null, 2) + '\n')
  } catch (error) {
    // Only a real failure (can't write the file) is fatal.
    console.error('Error writing stats file:', error)
    process.exit(1)
  }

  console.log('Stats updated successfully!')
  console.log('Current stats:')
  console.log(`  Stars: ${stats.stars}`)
  console.log(`  Contributors: ${stats.contributors}`)
  console.log(`  Version: ${stats.version}`)
  console.log(`  Monthly Downloads: ${stats.monthly_downloads}`)
  console.log(`  Discord Members: ${stats.discord}`)
}

// Only run when executed directly (not when imported by tests).
if (argv[1] && import.meta.url === pathToFileURL(argv[1]).href) {
  updateStats()
}
