export interface Stats {
  id?: number
  name?: string
  repo?: string
  description?: string
  createdAt?: string
  updatedAt?: string
  pushedAt?: string
  stars: number
  watchers?: number
  forks?: number
  defaultBranch?: string
  version: string
  monthly_downloads: number
  discord: number
  contributors: number
}
