import { describe, it, expect } from 'vitest'

describe('Plugin routes generation', () => {
  it('should generate correct plugin routes from file names', () => {
    const mockPluginFiles = ['advanced-alchemy.yml', 'sqlspec.yml', 'test-plugin.yaml']

    const routes = mockPluginFiles
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
      .map(file => {
        const basename = file.replace(/\.(yml|yaml)$/, '')
        return `/plugins/${basename}`
      })

    expect(routes).toEqual([
      '/plugins/advanced-alchemy',
      '/plugins/sqlspec',
      '/plugins/test-plugin'
    ])
  })

  it('should filter out non-yaml files', () => {
    const mockFiles = ['advanced-alchemy.yml', 'readme.md', 'sqlspec.yaml', 'config.json']

    const routes = mockFiles
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
      .map(file => {
        const basename = file.replace(/\.(yml|yaml)$/, '')
        return `/plugins/${basename}`
      })

    expect(routes).toEqual([
      '/plugins/advanced-alchemy',
      '/plugins/sqlspec'
    ])
  })

  it('should handle empty file array', () => {
    const mockFiles: string[] = []

    const routes = mockFiles
      .filter(file => file.endsWith('.yml') || file.endsWith('.yaml'))
      .map(file => {
        const basename = file.replace(/\.(yml|yaml)$/, '')
        return `/plugins/${basename}`
      })

    expect(routes).toEqual([])
  })
})