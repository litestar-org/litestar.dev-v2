import type { ParsedContentFile } from '@nuxt/content'

// export interface Stats {
//   maintainers: number
//   contributors: number
//   modules: number
// }

export interface PluginUser {
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
  compatibility: {
    litestar?: string
  }
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
  }[]
  readme?: ParsedContentFile
}
