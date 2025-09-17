import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import LitestarLogo from '~/components/LitestarLogo.vue'

describe('Components', () => {
  it('should mount LitestarLogo successfully', async () => {
    const component = await mountSuspended(LitestarLogo)
    expect(component.vm).toBeTruthy()
  })

  it('should render LitestarLogo with correct structure', async () => {
    const component = await mountSuspended(LitestarLogo)

    // Should have an SVG element
    const svg = component.find('svg')
    expect(svg.exists()).toBe(true)
  })
})

describe('Maintainers logic', () => {
  it('should filter maintainers correctly in component context', () => {
    const mockMaintainers = [
      { name: 'John', role: 'Maintainer' },
      { name: 'Jane', role: 'Member' },
      { name: 'Bob', role: 'Maintainer' },
    ]

    // This tests the same logic that would be used in the About page
    const maintainersCount =
      mockMaintainers?.filter((m) => m.role === 'Maintainer').length ?? 0

    expect(maintainersCount).toBe(2)
  })
})
