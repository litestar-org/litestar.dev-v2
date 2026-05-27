import { describe, it, expect } from 'vitest'
import { formatNumber } from '../../app/utils/index'

// Node and browser ICU data differ in compact-suffix casing ("1.5k" vs "1.5K"),
// which causes hydration mismatches on the static build (nuxt.com #2132).
// formatNumber must emit a deterministic uppercase suffix.

describe('formatNumber', () => {
  it('uppercases the thousands suffix', () => {
    expect(formatNumber(1500)).toBe('1.5K')
  })

  it('uppercases the millions suffix', () => {
    expect(formatNumber(1_500_000)).toBe('1.5M')
  })

  it('leaves small numbers untouched', () => {
    expect(formatNumber(999)).toBe('999')
  })
})
