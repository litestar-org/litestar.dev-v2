import { describe, it, expect } from 'vitest'
import { resolveStats, type Stats } from '../../scripts/update-stats'

// resolveStats merges freshly-fetched values with the previous stats so a single
// failed upstream API (null) can't clobber good data or abort the deploy.

const existing: Stats = {
  stars: 100,
  monthly_downloads: 2000,
  contributors: 50,
  discord: 300,
  version: '3.0.0',
}

describe('resolveStats', () => {
  it('uses freshly fetched values when present', () => {
    expect(
      resolveStats(
        {
          stars: 101,
          contributors: 51,
          version: '3.0.1',
          downloads: 2100,
          discord: 301,
        },
        existing,
      ),
    ).toEqual({
      stars: 101,
      monthly_downloads: 2100,
      contributors: 51,
      discord: 301,
      version: '3.0.1',
    })
  })

  it('falls back to existing values for fields that failed to fetch (null)', () => {
    expect(
      resolveStats(
        {
          stars: null,
          contributors: null,
          version: null,
          downloads: null,
          discord: null,
        },
        existing,
      ),
    ).toEqual(existing)
  })

  it('uses safe defaults when there is no existing data', () => {
    expect(
      resolveStats(
        {
          stars: null,
          contributors: null,
          version: null,
          downloads: null,
          discord: null,
        },
        null,
      ),
    ).toEqual({
      stars: 0,
      monthly_downloads: 0,
      contributors: 0,
      discord: 0,
      version: '0.0.0',
    })
  })

  it('preserves a genuine zero rather than falling back', () => {
    const result = resolveStats(
      {
        stars: 0,
        contributors: 0,
        version: '3.0.1',
        downloads: 0,
        discord: 0,
      },
      existing,
    )
    expect(result.stars).toBe(0)
    expect(result.monthly_downloads).toBe(0)
  })
})
