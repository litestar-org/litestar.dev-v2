<script setup lang="ts">
import type { Plugin } from '~/types'
import { PluginProseA, PluginProseKbd, PluginProseImg } from '#components'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import { color } from 'motion-v'
import type { PluginsCollectionItem } from '@nuxt/content'
import { routerKey } from 'vue-router'
// import PluginProseA from '~/components/plugin/PluginProseA.vue'
// import { useAsyncData } from '#imports'

definePageMeta({
  heroBackground: 'opacity-30 -z-10',
})
const route = useRoute()

const [{ data: plugin }, { data: pluginReadme }] = await Promise.all([
  useAsyncData(`plugin-${route.params.slug}`, () =>
    queryCollection('plugins').path(route.path).first(),
  ),
  useAsyncData(`plugin-readme-${route.params.slug}`, () =>
    queryCollection('pluginsReadme')
      .path(`/pluginsreadme/${route.params.slug}`)
      .first(),
  ),
])

if (!plugin.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Plugin not found',
    fatal: true,
  })
}
// const { default: pluginsData } = await import('~/data/plugins.json')
// const plugin = ref<PluginsCollectionItem | null>(pluginsData.find((p: PluginsCollectionItem) => p.key === route.params.slug) || null)

// const { data: plg } = await useAsyncData(`plugin-${route.params.slug}`, () => {
//   return queryCollection('plugins').path(`/plugins/${route.params.slug}`).first()
// })

// if (!plugin.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Plugin not found', fatal: true })
// }
// console.log(plugin.value)
// Fetch README from GitHub

// const { data } = await useFetch(`https://raw.githubusercontent.com/${plugin.value.repo}/main/README.md`)

// console.log(data)

// readme.value = data.value
// const { data: readmeContent } = await useAsyncData('markdown', () => parseMarkdown(readme.value))
// const { data: readmeContent } = await useAsyncData<any>(() => parseMarkdown(plg))
const readmeContent2 = computed(() =>
  pluginReadme.value ? pluginReadme.value : null,
)

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
  const repo = plugin.value?.repo
  if (!repo) return ''

  const project = repo.split('#')[0]
  if (!project) return ''

  const [owner, name] = project.split('/')
  return `${owner}/${name}`
})

const links = computed(() => {
  if (!plugin.value) return []

  const linkList = [
    {
      icon: 'i-lucide-book',
      label: 'Documentation',
      to: `${plugin.value.documentation || plugin.value.website}?utm_source=litestar.dev&utm_medium=aside-plugin&utm_campaign=litestar.dev`,
      target: '_blank',
    },
    {
      icon: 'i-simple-icons-github',
      label: ownerName.value,
      to: plugin.value.github,
      target: '_blank',
    },
  ]

  if (plugin.value.pypi) {
    linkList.push({
      icon: 'i-simple-icons-python',
      label: plugin.value.pypi,
      to: `https://pypi.org/project/${plugin.value.pypi}`,
      target: '_blank',
    })
  }

  if (plugin.value.changelog) {
    linkList.push({
      icon: 'i-lucide-scroll-text',
      label: 'Changelog',
      to: plugin.value.changelog,
      target: '_blank',
    })
  }

  if (plugin.value.issues) {
    linkList.push({
      icon: 'i-lucide-bug',
      label: 'Issues',
      to: plugin.value.issues,
      target: '_blank',
    })
  }

  return linkList
})

const detailsLinks = computed(() => {
  if (!plugin.value) return []

  const details = [
    {
      label: `Updated ${publishedAgo.value}`,
      to: `https://github.com/${plugin.value.repo}`,
      icon: 'i-lucide-radio',
    },
    {
      label: `Created ${createdAgo.value}`,
      to: `https://github.com/${plugin.value.repo}`,
      icon: 'i-lucide-package',
    },
  ]

  // Add Python versions as separate entries (static for testing)
  // if (plugin.value.python_versions) {
  //   const versions = Array.isArray(plugin.value.python_versions)
  //     ? plugin.value.python_versions
  //     : [plugin.value.python_versions]

  //   versions.forEach(version => {
  //     details.push({
  //       label: `Python ${version}`,
  //       icon: 'i-simple-icons-python'
  //     })
  //   })
  // }

  // Static Python versions moved to compatibility section below

  if (plugin.value.license) {
    details.push({
      label: 'MIT License',
      to: plugin.value.license,
      icon: 'i-lucide-scale',
      target: '_blank',
    })
  }

  return details
})

const compatibilityLinks = computed(() => {
  if (!plugin.value?.python_compatibility?.compatible) return []

  // Use actual Python compatibility data from content
  return plugin.value.python_compatibility.compatible.map((version) => ({
    label: `Python ${version}`,
    icon: 'i-simple-icons-python',
  }))
})

const title = computed(() => plugin.value?.name)
const description = computed(() => plugin.value?.description)
const publishedAgo = computed(() =>
  plugin.value?.updated_at ? useTimeAgo(plugin.value.updated_at).value : '',
)
const createdAgo = computed(() =>
  plugin.value?.created_at ? useTimeAgo(plugin.value.created_at).value : '',
)

useSeoMeta({
  titleTemplate: '%s · Litestar Plugins',
  title,
  description,
  ogDescription: description,
  ogTitle: computed(() => `${title.value} · Litestar Plugins`),
})

defineOgImageComponent('OgImagePlugin', {
  plugin: plugin.value,
  headline: 'Litestar Plugin',
  title: title.value,
  description: description.value,
})
</script>

<template>
  <UContainer v-if="plugin">
    <UPageHeader :description="plugin.description" :ui="{ headline: 'mb-8' }">
      <template #headline>
        <UBreadcrumb
          :items="[
            { label: 'Plugins', to: '/plugins' },
            {
              to: { name: 'plugins', query: { category: plugin.category } },
              label: plugin.category,
            },
            { label: plugin.name },
          ]"
        />
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
            {{ plugin.name }}

            <UTooltip
              v-if="plugin.type === 'official'"
              text="Official plugin"
              class="tracking-normal"
            >
              <UIcon name="i-lucide-medal" class="size-6 text-primary" />
            </UTooltip>
          </div>
        </div>
      </template>

      <div class="flex flex-col lg:flex-row lg:items-center gap-3 mt-4">
        <UTooltip text="Monthly PyPi Downloads">
          <NuxtLink
            class="flex items-center gap-1.5"
            :to="`https://pypistats.org/packages/${plugin.pypi}`"
            target="_blank"
          >
            <UIcon name="i-lucide-circle-arrow-down" class="size-5 shrink-0" />
            <span class="text-sm font-medium"
              >{{ formatNumber(plugin.monthly_downloads || 0) }} downloads</span
            >
          </NuxtLink>
        </UTooltip>

        <span class="hidden lg:block text-muted">&bull;</span>

        <UTooltip text="GitHub Stars">
          <NuxtLink
            class="flex items-center gap-1.5"
            :to="`https://github.com/${plugin.repo}`"
            target="_blank"
          >
            <UIcon name="i-lucide-star" class="size-5 shrink-0" />
            <span class="text-sm font-medium"
              >{{ formatNumber(plugin.stars || 0) }} stars</span
            >
          </NuxtLink>
        </UTooltip>

        <span class="hidden lg:block text-muted">&bull;</span>

        <UTooltip text="Latest Version">
          <NuxtLink
            class="flex items-center gap-1.5"
            :to="`${plugin.github}/releases`"
            target="_blank"
          >
            <UIcon name="i-lucide-tag" class="size-5 shrink-0" />
            <span class="text-sm font-medium"
              >v{{ plugin.latest_version || plugin.stats?.version }}</span
            >
          </NuxtLink>
        </UTooltip>

        <div
          class="mx-3 h-6 border-l border-gray-200 dark:border-gray-800 w-px hidden lg:block"
        />

        <div
          v-for="(maintainer, index) in plugin.maintainers"
          :key="maintainer.github"
          class="flex items-center gap-3"
        >
          <NuxtLink
            :to="`https://github.com/${maintainer.github}`"
            target="_blank"
            class="flex items-center gap-1.5 hover:text-primary"
          >
            <UAvatar
              provider="ipx"
              :src="`https://ipx.nuxt.com/f_auto,s_20x20/gh_avatar/${maintainer.github}`"
              :srcset="`https://ipx.nuxt.com/f_auto,s_40x40/gh_avatar/${maintainer.github} 2x`"
              :alt="maintainer.github"
              size="xs"
            />
            <span class="text-sm font-medium">{{ maintainer.github }}</span>
          </NuxtLink>

          <span
            v-if="index < plugin.maintainers.length - 1"
            class="hidden lg:block text-muted"
            >&bull;</span
          >
        </div>
      </div>
    </UPageHeader>

    <UPage>
      <UPageBody>
        <ContentRenderer
          v-if="readmeContent2?.body"
          :value="readmeContent2"
          :components="{
            a: PluginProseA,
            img: PluginProseImg,
            kbd: PluginProseKbd,
          }"
          class="first:[&_picture]:block first:[&_picture]:mb-4"
        />
      </UPageBody>

      <template #right>
        <UContentToc>
          <template #bottom>
            <div class="hidden lg:block space-y-6">
              <UPageLinks title="Links" :links="links" />

              <USeparator type="dashed" />

              <UPageLinks title="Details" :links="detailsLinks" />

              <USeparator type="dashed" />

              <UPageLinks
                title="Python Compatibility"
                :links="compatibilityLinks"
              />

              <USeparator type="dashed" />

              <SocialLinks />
            </div>
          </template>
        </UContentToc>
      </template>
    </UPage>
  </UContainer>
</template>
