import { describe, it, expect } from 'vitest'
import { isDefaultPluginIcon } from '../../app/composables/usePlugins'

describe('isDefaultPluginIcon', () => {
  it('returns true for an empty string', () => {
    expect(isDefaultPluginIcon('')).toBe(true)
  })

  it('returns true for undefined', () => {
    expect(isDefaultPluginIcon(undefined)).toBe(true)
  })

  it('returns true for the registry default icon filename', () => {
    expect(isDefaultPluginIcon('_default_icon.svg')).toBe(true)
  })

  it('returns false for a custom plugin icon (svg)', () => {
    expect(isDefaultPluginIcon('litestar-htmx.svg')).toBe(false)
  })

  it('returns false for a custom plugin icon (png)', () => {
    expect(isDefaultPluginIcon('advanced-alchemy.png')).toBe(false)
  })

  it('returns false for an absolute URL', () => {
    expect(isDefaultPluginIcon('https://example.com/icon.svg')).toBe(false)
  })
})
