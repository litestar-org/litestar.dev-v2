#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

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

interface Stats {
  stars: number
  monthly_downloads: number
  contributors: number
  discord: number
  version: string
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

async function getStarCount(): Promise<number> {
  const repo = await fetchGitHubData<GitHubRepo>(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}`,
  )
  return repo.stargazers_count
}

async function getContributorsCount(): Promise<number> {
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
}

async function getLatestVersion(): Promise<string> {
  const release = await fetchGitHubData<GitHubRelease>(
    `/repos/${GITHUB_OWNER}/${GITHUB_REPO}/releases/latest`,
  )
  // Remove 'v' prefix if present
  return release.tag_name.replace(/^v/, '')
}

async function getPyPIDownloads(): Promise<number> {
  try {
    // PyPI stats API for monthly downloads
    const response = await fetch(
      `https://pypistats.org/api/packages/${GITHUB_REPO}/recent?period=month`,
    )

    if (!response.ok) {
      console.warn('Failed to fetch PyPI downloads, keeping existing value')
      return 0
    }

    const data = (await response.json()) as {
      data: { last_month: number }
    }
    return data.data.last_month
  } catch (error) {
    console.warn('Error fetching PyPI downloads:', error)
    return 0
  }
}

async function getDiscordMemberCount(): Promise<number> {
  try {
    const response = await fetch(
      `https://discord.com/api/v9/invites/${DISCORD_INVITE_CODE}?with_counts=true`,
    )

    if (!response.ok) {
      console.warn(
        'Failed to fetch Discord member count, keeping existing value',
      )
      return 0
    }

    const data = (await response.json()) as DiscordInvite
    return data.approximate_member_count
  } catch (error) {
    console.warn('Error fetching Discord member count:', error)
    return 0
  }
}

async function updateStats() {
  console.log('Fetching stats from GitHub, PyPI, and Discord...')

  try {
    const [stars, contributors, version, downloads, discordMembers] =
      await Promise.all([
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

    const stats: Stats = {
      stars,
      monthly_downloads: downloads || existingStats?.monthly_downloads || 0,
      contributors,
      discord: discordMembers || existingStats?.discord || 0,
      version,
    }

    await writeFile(STATS_FILE_PATH, JSON.stringify(stats, null, 2) + '\n')

    console.log('Stats updated successfully!')
    console.log('Current stats:')
    console.log(`  Stars: ${stats.stars}`)
    console.log(`  Contributors: ${stats.contributors}`)
    console.log(`  Version: ${stats.version}`)
    console.log(`  Monthly Downloads: ${stats.monthly_downloads}`)
    console.log(`  Discord Members: ${stats.discord}`)
  } catch (error) {
    console.error('Error updating stats:', error)
    process.exit(1)
  }
}

updateStats()
