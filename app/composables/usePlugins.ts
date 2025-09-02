import type { Plugin, Filter, Stats } from '~/types'

type PluginStatsKeys = 'version' | 'downloads' | 'stars' | 'publishedAt' | 'createdAt'

const iconsMap = {
  Official: 'i-lucide-medal',
  Analytics: 'i-lucide-bar-chart',
  Database: 'i-lucide-database',
  Extensions: 'i-lucide-puzzle',
  Monitoring: 'i-lucide-timer',
  Payment: 'i-lucide-credit-card',
  Performance: 'i-lucide-gauge',
  Request: 'i-lucide-unplug',
  Security: 'i-lucide-shield',
  UI: 'i-lucide-layout'
}

export const pluginImage = function (icon: string = '', _size: number = 80) {
  if (!icon) return

  if (/^https?:\/\//.test(icon)) return icon
  return `https://raw.githubusercontent.com/litestar-org/plugins/main/icons/${icon}`
  // if (/\.svg$/.test(icon)) return `https://raw.githubuserxcontent.com/nuxt/modules/main/icons/${icon}`

  // return `https://ipx.nuxt.com/s_${size},f_auto/gh/nuxt/modules/main/icons/${icon}`
}

export const pluginIcon = function (category: string) {
  return iconsMap[category as keyof typeof iconsMap] || 'i-lucide-box'
}

export const usePlugins = () => {
  const route = useRoute()
  const router = useRouter()
  const stats = useState<Stats>('plugin-stats', () => ({
    maintainers: 0,
    contributors: 0,
    plugins: 0
  }))
  const plugins = useState<Plugin[]>('plugins', () => [])
  const plugin = useState<Plugin>('plugin', () => ({} as Plugin))

  // Data fetching
  async function fetchList() {
    // console.log(plugins.value.length)
    if (plugins.value.length) {
      return
    }
    // Import plugins from local JSON file
    const { default: pluginsData } = await import('~/data/plugins.json')
    plugins.value = pluginsData
    // console.log(plugins.value)
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
    { key: 'asc', label: 'Asc', icon: 'i-lucide-arrow-up-wide-narrow' }
  ]

  const categories = computed<Filter[]>(() => {
    return Object.keys(iconsMap)
      .map((category) => {
        return {
          key: category,
          label: category,
          active: route.query.category === category,
          to: { name: 'plugins', query: category === route.query.category ? undefined : { category }, state: { smooth: '#smooth' } },
          icon: iconsMap[category as keyof typeof iconsMap] || undefined,
          click: (e: Event) => {
            if (route.query.category !== category) {
              return
            }

            e.preventDefault()

            router.replace({ query: { ...route.query, category: undefined } })
          }
        }
      })
  })

  const selectedCategory = computed(() => {
    return categories.value.find(category => category.label === route.query.category)
  })

  const selectedSort = computed(() => {
    return sorts.find(sort => sort.key === route.query.sortBy) || sorts[0]
  })

  const selectedOrder = computed(() => {
    return orders.find(order => order.key === route.query.orderBy) || orders[0]
  })

  const q = computed<string>(() => {
    return route.query.q as string
  })

  const isSponsorOrOfficial = (a: Plugin, b: Plugin) => {
    if (a.sponsor && !b.sponsor) {
      return -1
    } else if (!a.sponsor && b.sponsor) {
      return 1
    } else if (a.type === 'official' && b.type !== 'official') {
      return -1
    } else if (a.type !== 'official' && b.type === 'official') {
      return 1
    } else {
      return 0
    }
  }

  const filteredPlugins = computed<Plugin[]>(() => {
    let filteredPlugins = [...plugins.value]
      .filter((plugin: Plugin) => {
        if (selectedCategory.value) {
          if (selectedCategory.value.key === 'Official') {
            return plugin.type === 'official'
          }
          if (plugin.category !== selectedCategory.value.key) {
            return false
          }
        }
        const queryRegExp = searchTextRegExp(q.value as string)
        if (q.value && !['name', 'npm', 'category', 'description', 'repo'].map(field => plugin[field as keyof Plugin]).filter(Boolean).some(value => typeof value === 'string' && value.search(queryRegExp) !== -1)) {
          return false
        }

        return true
      })
      .sort((a: Plugin, b: Plugin) => {
        const sortKey = selectedSort.value?.key as PluginStatsKeys
        if (sortKey && a.stats && b.stats) {
          return (b.stats[sortKey] as number) - (a.stats[sortKey] as number)
        }
        return 0
      })

    if (selectedOrder.value?.key === 'asc') {
      filteredPlugins = filteredPlugins.reverse()
    }

    // sponsored & official plugins in first place if no sort or order by
    if (!route.query.sortBy && !route.query.orderBy) {
      return filteredPlugins.sort(isSponsorOrOfficial)
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
    q
  }
}