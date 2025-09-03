<script setup lang="ts">
import type { Plugin } from '~/types'
// import { PluginProseA, PluginProseKbd, PluginProseImg } from '#components'
// import { parseMarkdown } from '@nuxtjs/mdc/runtime'
// import { useAsyncData } from '#imports'

definePageMeta({
  heroBackground: 'opacity-30 -z-10'
})
const route = useRoute()

const { default: pluginsData } = await import('~/data/plugins.json')
const plugin = ref<Plugin | null>(pluginsData.find((p: Plugin) => p.key === route.params.slug) || null)

// if (!plugin.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Plugin not found', fatal: true })
// }
// console.log(plugin.value)
// Fetch README from GitHub
// const readme = ref<any>(null)

// const { data } = await useFetch(`https://raw.githubusercontent.com/${plugin.value.repo}/main/README.md`)

// console.log(data)

// readme.value = data.value 
// const { data: readmeContent } = await useAsyncData<any>(() => parseMarkdown(readme.value))

// console.log(readmeContent)
// if (plugin.value?.repo) {
//   try {
//     const readmeUrl = `https://raw.githubusercontent.com/${plugin.value.repo}/main/README.md`
//     const readmeContent = await $fetch<string>(readmeUrl).catch(() => 
//       $fetch<string>(`https://raw.githubusercontent.com/${plugin.value.repo}/main/README.md`)
//     )
    
//     if (readmeContent) {
//       // Parse the markdown content using Nuxt Content
//       const { $content } = useNuxtApp()
//       // const parsed = await parseMarkdown(readmeContent)
//       readme.value = parsed
//       console.log(parsed)
//     }
//   } catch (error) {
//     console.warn(`Could not fetch README for ${plugin.value.repo}:`, error)
//     readme.value = null
//   }
// }
// if (!plugin.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Module not found', fatal: true })
// }

const ownerName = computed(() => {
  if (!plugin.value?.repo) return ''
  const [owner, name] = plugin.value?.repo.split('#')[0].split('/')
  return `${owner}/${name}`
})

const links = computed(() => {
  if (!plugin.value) return []
  
  const linkList = [{
    icon: 'i-lucide-book',
    label: 'Documentation',
    to: `${plugin.value.documentation || plugin.value.website}?utm_source=litestar.dev&utm_medium=aside-plugin&utm_campaign=litestar.dev`,
    target: '_blank'
  }, {
    icon: 'i-simple-icons-github',
    label: ownerName.value,
    to: plugin.value.github,
    target: '_blank'
  }]
  
  if (plugin.value.pypi) {
    linkList.push({
      icon: 'i-simple-icons-python',
      label: plugin.value.pypi,
      to: `https://pypi.org/project/${plugin.value.pypi}`,
      target: '_blank'
    })
  }
  
  if (plugin.value.learn_more) {
    linkList.push({
      icon: 'i-lucide-link',
      label: 'Learn more',
      to: plugin.value.learn_more,
      target: '_blank'
    })
  }
  
  return linkList
})


const title = computed(() => plugin.value?.pypi || plugin.value?.name)
const description = computed(() => plugin.value?.description || 'A Litestar plugin')
const publishedAgo = computed(() => plugin.value?.stats?.publishedAt ? useTimeAgo(plugin.value.stats.publishedAt).value : '')
const createdAgo = computed(() => plugin.value?.stats?.createdAt ? useTimeAgo(plugin.value.stats.createdAt).value : '')

// useSeoMeta({
//   titleTemplate: '%s · Litestar Plugins',
//   title,
//   description,
//   ogDescription: description,
//   ogTitle: computed(() => `${title.value} · Litestar Plugins`)
// })

// defineOgImageComponent('Plugin', {
//   plugin: plugin.value,
//   headline: 'Litestar Plugins',
//   title: title.value,
//   description: description.value
// })
</script>

<template>
  <UContainer v-if="plugin">
    <UPageHeader :description="plugin.description" :ui="{ headline: 'mb-8' }">
      <template #headline>
        <UBreadcrumb :items="[{ label: 'Plugins', to: '/plugins' }, { to: { name: 'plugins', query: { category: plugin.category } }, label: plugin.category }, { label: plugin.pypi }]" />
      </template>
      <template #title>
        <div class="flex items-center gap-4">
          <UAvatar
            :src="pluginImage(plugin.icon)"
            :icon="pluginIcon(plugin.category)"
            :alt="plugin.name"
            size="xl"
            class="-m-[4px] rounded-none bg-transparent"
          />

          <div>
            {{ plugin.pypi }}

            <UTooltip v-if="plugin.type === 'official'" text="Official plugin" class="tracking-normal">
              <UIcon name="i-lucide-medal" class="size-6 text-primary" />
            </UTooltip>
          </div>
        </div>
      </template>

      <div class="flex flex-col lg:flex-row lg:items-center gap-3 mt-4">
        <UTooltip text="Monthly NPM Downloads">
          <NuxtLink class="flex items-center gap-1.5" :to="`https://npm.chart.dev/${plugin.npm}`" target="_blank">
            <UIcon name="i-lucide-circle-arrow-down" class="size-5 shrink-0" />
            <span class="text-sm font-medium">{{ formatNumber(plugin.stats?.downloads || 0) }} downloads</span>
          </NuxtLink>
        </UTooltip>

        <span class="hidden lg:block text-muted">&bull;</span>

        <UTooltip text="GitHub Stars">
          <NuxtLink class="flex items-center gap-1.5" :to="`https://github.com/${plugin.repo}`" target="_blank">
            <UIcon name="i-lucide-star" class="size-5 shrink-0" />
            <span class="text-sm font-medium">{{ formatNumber(plugin.stars || plugin.stats?.stars || 0) }} stars</span>
          </NuxtLink>
        </UTooltip>

        <span class="hidden lg:block text-muted">&bull;</span>

        <UTooltip text="Latest Version">
          <NuxtLink class="flex items-center gap-1.5" :to="`${plugin.github}/releases`" target="_blank">
            <UIcon name="i-lucide-tag" class="size-5 shrink-0" />
            <span class="text-sm font-medium">v{{ plugin.latest_version || plugin.stats?.version }}</span>
          </NuxtLink>
        </UTooltip>

        <div class="mx-3 h-6 border-l border-gray-200 dark:border-gray-800 w-px hidden lg:block" />

        <div v-for="(maintainer, index) in plugin.maintainers" :key="maintainer.github" class="flex items-center gap-3">
          <NuxtLink :to="`https://github.com/${maintainer.github}`" target="_blank" class="flex items-center gap-1.5 hover:text-primary">
            <UAvatar provider="ipx" :src="`https://ipx.nuxt.com/f_auto,s_20x20/gh_avatar/${maintainer.github}`" :srcset="`https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/${maintainer.github} 2x`" :alt="maintainer.github" size="xs" />
            <span class="text-sm font-medium">{{ maintainer.github }}</span>
          </NuxtLink>

          <span v-if="index < plugin.maintainers.length - 1" class="hidden lg:block text-muted">&bull;</span>
        </div>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>

      </UPageBody>

      <template #right>
        <UContentToc>
          <template #bottom>
            <div class="hidden lg:block space-y-6">
              <UPageLinks title="Links" :links="links" />


              <USeparator type="dashed" />
              <SocialLinks />
            </div>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>