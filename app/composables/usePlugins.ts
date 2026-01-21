import type { PluginsCollectionItem } from '@nuxt/content'
import type { Filter, Stats } from '~/types'

type PluginStatsKeys =
  | 'version'
  | 'monthly_downloads'
  | 'stars'
  | 'updated_at'
  | 'created_at'

const iconsMap = {
  Official: 'i-lucide-medal',
  AI: 'i-lucide-brain',
  Analytics: 'i-lucide-bar-chart',
  Authentication: 'i-lucide-user',
  Database: 'i-lucide-database',
  Deployment: 'i-lucide-cloud',
  'Background Processing': 'i-lucide-puzzle',
  Monitoring: 'i-lucide-timer',
  Performance: 'i-lucide-gauge',
  Serialization: 'i-lucide-unplug',
  Security: 'i-lucide-shield',
  UI: 'i-lucide-layout',
  Others: 'i-lucide-boxes',
}

export const pluginImage = function (icon: string = '', _size: number = 80) {
  if (!icon) return

  if (/^https?:\/\//.test(icon)) return icon
  return `https://raw.githubusercontent.com/litestar-org/plugin-registry/main/icons/${icon}`

}

export const pluginIcon = function (category: string) {
  return iconsMap[category as keyof typeof iconsMap] || 'i-lucide-box'
}

export const usePlugins = () => {
  const route = useRoute()
  const router = useRouter()
  const stats = useState<Stats>('plugin-stats', () => ({
    stars: 0,
    version: '',
    monthly_downloads: 0,
    discord: 0,
    contributors: 0,
  }))
  const plugins = useState<PluginsCollectionItem[]>('plugins', () => [])
  const plugin = useState<PluginsCollectionItem>(
    'plugin',
    () => ({}) as PluginsCollectionItem,
  )

  // Data fetching
  async function fetchList() {
    if (plugins.value.length) {
      return
    }

    try {
      // Fetch plugins from individual YAML files
      const { data } = await useAsyncData('plugins', async () => {
        const collection = await queryCollection('plugins')
        return await collection.all()
      })
      plugins.value = data.value || []
    } catch (error) {
      console.error('Failed to fetch plugins from content:', error)
      plugins.value = []
    }
  }

  // Data
  const sorts: Filter[] = [
    { key: 'downloads', label: 'Downloads' },
    { key: 'stars', label: 'Stars' },
    // { key: 'publishedAt', label: 'Updated' },
    // { key: 'createdAt', label: 'Created' }
  ]

  const orders: Filter[] = [
    { key: 'desc', label: 'Desc', icon: 'i-lucide-arrow-down-wide-narrow' },
    { key: 'asc', label: 'Asc', icon: 'i-lucide-arrow-up-wide-narrow' },
  ]

  const categories = computed<Filter[]>(() => {
    return Object.keys(iconsMap).map((category) => {
      return {
        key: category,
        label: category,
        active: route.query.category === category,
        to: {
          name: 'plugins',
          query: category === route.query.category ? undefined : { category },
          state: { smooth: '#smooth' },
        },
        icon: iconsMap[category as keyof typeof iconsMap] || undefined,
        click: (e: Event) => {
          if (route.query.category !== category) {
            return
          }

          e.preventDefault()

          router.replace({ query: { ...route.query, category: undefined } })
        },
      }
    })
  })

  const selectedCategory = computed(() => {
    return categories.value.find(
      (category) => category.label === route.query.category,
    )
  })

  const selectedSort = computed(() => {
    return sorts.find((sort) => sort.key === route.query.sortBy) || sorts[0]
  })

  const selectedOrder = computed(() => {
    return (
      orders.find((order) => order.key === route.query.orderBy) || orders[0]
    )
  })

  const q = computed<string>(() => {
    return route.query.q as string
  })

  const isOfficial = (a: PluginsCollectionItem, b: PluginsCollectionItem) => {
    if (a.type === 'official' && b.type !== 'official') {
      return -1
    } else if (a.type !== 'official' && b.type === 'official') {
      return 1
    } else {
      return 0
    }
  }

  const filteredPlugins = computed<PluginsCollectionItem[]>(() => {
    let filteredPlugins = [...plugins.value]
      .filter((plugin: PluginsCollectionItem) => {
        if (selectedCategory.value) {
          if (selectedCategory.value.key === 'Official') {
            return plugin.type === 'official'
          }
          if (plugin.category !== selectedCategory.value.key) {
            return false
          }
        }
        const queryRegExp = searchTextRegExp(q.value as string)
        if (
          q.value &&
          !['name', 'pypi', 'category', 'description', 'repo']
            .map((field) => plugin[field as keyof PluginsCollectionItem])
            .filter(Boolean)
            .some(
              (value) =>
                typeof value === 'string' && value.search(queryRegExp) !== -1,
            )
        ) {
          return false
        }

        return true
      })
      .sort((a: PluginsCollectionItem, b: PluginsCollectionItem) => {
        const sortKey = selectedSort.value?.key as PluginStatsKeys
        if (sortKey && sortKey === 'monthly_downloads') {
          return (b.monthly_downloads || 0) - (a.monthly_downloads || 0)
        }
        if (sortKey && sortKey === 'stars') {
          return (b.stars || 0) - (a.stars || 0)
        }
        return 0
      })

    if (selectedOrder.value?.key === 'asc') {
      filteredPlugins = filteredPlugins.reverse()
    }

    // official plugins in first place if no sort or order by
    if (!route.query.sortBy && !route.query.orderBy) {
      return filteredPlugins.sort(isOfficial)
    }
    return filteredPlugins
  })

  return {
    // Data fetching
    fetchList,
    // Data
    // versions,
    sorts,
    orders,
    // Computed
    stats,
    plugins,
    filteredPlugins,
    plugin,
    categories,
    // types,
    // contributors,
    // stats,
    selectedCategory,
    // selectedType,
    // selectedVersion,
    selectedSort,
    selectedOrder,
    q,
  }
}
