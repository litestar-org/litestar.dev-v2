import { createSharedComposable } from '@vueuse/core'

function _useHeaderLinks() {
  const route = useRoute()
  const { version } = useDocsVersion()

  const headerLinks = computed(() => {

    return [{
      label: 'Documentation',
      icon: 'i-lucide-book-marked',
      to: 'https://docs.litestar.dev/2/',
      target: '_blank',
      search: false,
    }, {
      label: 'Modules',
      to: '/modules',
      icon: 'i-lucide-puzzle',
      search: false,
    },{
      label: 'Deploy',
      to: '/deploy',
      icon: 'i-lucide-puzzle',
      search: false,
    }, {
      label: 'Templates',
      icon: 'i-lucide-app-window',
      to: '/templates',
      search: false,
    }, {
      label: 'Blog',
      icon: 'i-lucide-newspaper',
      to: '/blog'
    }, {
      label: 'About',
      icon: 'i-lucide-building-2',
      to: '/about',
      search: false,
    }]
  })

  return { headerLinks }
}

export const useHeaderLinks = import.meta.client ? createSharedComposable(_useHeaderLinks) : _useHeaderLinks

const footerLinks = [{
  label: 'Community',
  children: [{
    label: 'Nuxters',
    to: 'https://nuxters.nuxt.com',
    target: '_blank'
  }, {
    label: 'Team',
    to: '/team'
  }, {
    label: 'Design Kit',
    to: '/design-kit'
  }]
}, {
  label: 'Products',
  children: [{
    label: 'Nuxt UI Pro',
    to: 'https://ui.nuxt.com/pro?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'Nuxt Studio',
    to: 'https://content.nuxt.com/studio/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }, {
    label: 'NuxtHub',
    to: 'https://hub.nuxt.com/?utm_source=nuxt-website&utm_medium=footer',
    target: '_blank'
  }]
}, {
  label: 'Enterprise',
  children: [{
    label: 'Support',
    to: '/enterprise/support'
  }, {
    label: 'Agencies',
    to: '/enterprise/agencies'
  }, {
    label: 'Sponsors',
    to: '/enterprise/sponsors'
  }]
}]

export const useFooterLinks = () => ({ footerLinks })

const _useNavigation = () => {
  const nuxtApp = useNuxtApp()
  const searchTerm = ref<string>('')

  const { headerLinks } = useHeaderLinks()
  const { footerLinks } = useFooterLinks()

  const searchLinks = computed(() => [
    {
      label: 'Ask AI',
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect: () => nuxtApp.$kapa?.openModal()
    },
    ...headerLinks.value.map((link) => {
      // Remove `/docs` and `/enterprise` links from command palette
      if (link.search === false) {
        return {
          label: link.label,
          icon: link.icon,
          children: link.children
        }
      }
      return link
    }).filter((link): link is NonNullable<typeof link> => Boolean(link)), {
      label: 'Team',
      icon: 'i-lucide-users',
      to: '/team'
    }, {
      label: 'Design Kit',
      icon: 'i-lucide-palette',
      to: '/design-kit'
    }, {
      label: 'Newsletter',
      icon: 'i-lucide-mail',
      to: '/newsletter'
    }])

  type SearchGroup = {
    id: string
    label: string
    icon?: string
    items: Array<{
      id: string
      label: string
      suffix?: string
      icon?: string
      avatar?: {
        src?: string
        ui?: {
          root: string
        }
      }
      to: string
      onSelect?: () => Promise<void>
    }>
  }

  const searchGroups = computed<SearchGroup[]>(() => {
    const aiGroup: SearchGroup = {
      id: 'ask-ai-search',
      label: 'AI',
      icon: 'i-lucide-wand',
      items: []
    }

    const modulesGroup: SearchGroup = {
      id: 'modules-search',
      label: 'Modules',
      items: []
    }

    const hostingGroup: SearchGroup = {
      id: 'hosting-search',
      label: 'Hosting',
      items: []
    }

    const groups = [aiGroup, modulesGroup, hostingGroup]

    if (!searchTerm.value) {
      return groups
    }

    aiGroup.items = [{
      id: `ask-ai-${searchTerm.value}`,
      label: `Ask AI about "${searchTerm.value}"`,
      icon: 'i-lucide-wand',
      to: 'javascript:void(0);',
      onSelect() {
        return nuxtApp.$kapa.openModal(searchTerm.value)
      }
    }]

    const loadModules = async () => {
      const { modules, fetchList } = useModules()
      if (!modules.value.length) {
        await fetchList()
      }

      modulesGroup.items = modules.value
        .filter(module => ['name', 'npm', 'repo'].map(field => module[field as keyof typeof module]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(module => ({
          id: `module-${module.name}`,
          label: module.npm,
          suffix: module.description,
          avatar: {
            src: moduleImage(module.icon),
            ui: {
              root: 'rounded-none bg-transparent'
            }
          },
          to: `/modules/${module.name}`
        }))
    }

    const loadHosting = async () => {
      const { providers, fetchList } = useHostingProviders()
      if (!providers.value.length) {
        await fetchList()
      }

      hostingGroup.items = providers.value
        .filter(hosting => ['title'].map(field => hosting[field as keyof typeof hosting]).filter(Boolean).some(value => typeof value === 'string' && value.search(searchTextRegExp(searchTerm.value)) !== -1))
        .map(hosting => ({
          id: `hosting-${hosting.path}`,
          label: hosting.title,
          suffix: hosting.description,
          icon: hosting.logoIcon,
          avatar: hosting.logoSrc
            ? {
                src: hosting.logoSrc,
                ui: {
                  root: 'rounded-none bg-transparent'
                }
              }
            : undefined,
          to: hosting.path
        }))
    }

    onMounted(() => {
      Promise.all([
        loadModules(),
        loadHosting()
      ]).catch(error => console.error('Error loading search results:', error))
    })

    return groups
  })

  return {
    searchTerm,
    headerLinks,
    footerLinks,
    searchLinks,
    searchGroups
  }
}

export const useNavigation = import.meta.client ? createSharedComposable(_useNavigation) : _useNavigation