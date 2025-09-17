import { describe, it, expect } from 'vitest'

describe('Maintainers filtering', () => {
  const mockMaintainers = [
    {
      name: 'John Doe',
      role: 'Maintainer',
      avatar: 'https://example.com/john.png',
      github: 'https://github.com/john',
    },
    {
      name: 'Jane Smith',
      role: 'Member',
      avatar: 'https://example.com/jane.png',
      github: 'https://github.com/jane',
    },
    {
      name: 'Bob Wilson',
      role: 'Maintainer',
      avatar: 'https://example.com/bob.png',
      github: 'https://github.com/bob',
    },
    {
      name: 'Alice Brown',
      role: 'Member',
      avatar: 'https://example.com/alice.png',
      github: 'https://github.com/alice',
    },
  ]

  it('should filter maintainers by role', () => {
    const maintainersOnly = mockMaintainers.filter(
      (m) => m.role === 'Maintainer',
    )

    expect(maintainersOnly).toHaveLength(2)
    expect(maintainersOnly.every((m) => m.role === 'Maintainer')).toBe(true)
    expect(maintainersOnly.map((m) => m.name)).toEqual([
      'John Doe',
      'Bob Wilson',
    ])
  })

  it('should filter members by role', () => {
    const membersOnly = mockMaintainers.filter((m) => m.role === 'Member')

    expect(membersOnly).toHaveLength(2)
    expect(membersOnly.every((m) => m.role === 'Member')).toBe(true)
    expect(membersOnly.map((m) => m.name)).toEqual([
      'Jane Smith',
      'Alice Brown',
    ])
  })

  it('should handle empty array', () => {
    const emptyArray: typeof mockMaintainers = []
    const maintainersOnly = emptyArray.filter((m) => m.role === 'Maintainer')

    expect(maintainersOnly).toHaveLength(0)
  })

  it('should handle array with no maintainers', () => {
    const membersOnlyArray = mockMaintainers.filter((m) => m.role === 'Member')
    const maintainersOnly = membersOnlyArray.filter(
      (m) => m.role === 'Maintainer',
    )

    expect(maintainersOnly).toHaveLength(0)
  })
})
