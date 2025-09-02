
import type { ParsedContentFile } from '@nuxt/content'

// export interface Stats {
//   maintainers: number
//   contributors: number
//   modules: number
// }

export interface ModuleUser {
  name: string
  github: string
  twitter?: string
  bluesky?: string
}

export interface Plugin {
  key: string
  name: string
  description: string
  repo: string
  pypi?: string
  npm?: string
  icon: string
  github: string
  website: string
  documentation?: string
  learn_more?: string
  category: string
  type: string
  sponsor?: boolean
  // tags: string[]
  compatibility: { litestar?: string, nuxt?: string, requires?: { bridge: boolean } }
  stats?: {
    version: string
    downloads: number
    stars: number
    publishedAt: number
    createdAt: number
  }
  stars?: number
  latest_version?: string
  maintainers: {
    name: string
    github: string
    avatar?: string
    twitter?: string
    bluesky?: string
  }[]
  contributors?: {
    id: number
    username: string
    contributions: number
  }[]
  readme?: ParsedContentFile
}