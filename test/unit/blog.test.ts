import { describe, it, expect } from 'vitest'
import { isPublished } from '../../app/utils/index'

// Blog posts carry an optional `draft` flag (content.config.ts). Draft posts
// must not be published in the production build: useBlog (and the [slug]
// surround) filter them out so they are never linked, crawled, prerendered,
// or listed in sitemap.xml. They stay visible in dev for author preview.

describe('isPublished', () => {
  it('treats draft entries as not published', () => {
    expect(isPublished({ draft: true })).toBe(false)
  })

  it('treats draft: false entries as published', () => {
    expect(isPublished({ draft: false })).toBe(true)
  })

  it('treats entries with no draft field as published', () => {
    expect(isPublished({})).toBe(true)
  })
})
