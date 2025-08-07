<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const logo = useTemplateRef('logo')
const route = useRoute()
const stats = useStats()
const { copy } = useClipboard()
const { headerLinks } = useHeaderLinks()
const { version } = useDocsVersion()

const { tags } = useDocsTags()

const latestVersion = computed(() => {
  return '3.0'
  // const versionMatch = stats.value?.version?.match(/\d+\.\d+/)
  // return versionMatch ? versionMatch[0] : undefined
})


// const mobileNavigation = computed<ContentNavigationItem[]>(() => {
//   // Show Migration and Bridge on mobile only when user is reading them
//   const docsLink = navigation.value.find(link => link.path === version.value.path)
//   if (docsLink && !route.path.startsWith(`${version.value.path}/bridge`) && !route.path.startsWith(`${version.value.path}/migration`)) {
//     docsLink.children = docsLink.children?.filter(link => ![`${version.value.path}/bridge`, `${version.value.path}/migration`].includes(link.path as string)) || []
//   }

//   return [
//     docsLink,
//     ...headerLinks.value.slice(1).map(link => ({
//       ...link,
//       title: link.label,
//       path: link.to,
//       children: link.children?.map(child => ({
//         ...child,
//         title: child.label,
//         path: child.to
//       }))
//     } as ContentNavigationItem)),
//     {
//       title: 'Design Kit',
//       icon: 'i-lucide-palette',
//       path: '/design-kit'
//     }
//   ].filter((item): item is ContentNavigationItem => Boolean(item))
// })

// const defaultOpen = computed(() => {
//   const topLevelWithChildren = mobileNavigation.value.filter(link => link.children?.length)
//   const currentPath = route.path

//   return topLevelWithChildren.some(link => link.children?.some(child => currentPath.startsWith(child.path as string)))
// })

</script>

<template>
  <UHeader>
    <template #left>
      <NuxtLink to="/" class="flex gap-2 items-end" aria-label="Back to home">
        <!-- <NuxtImg src="/litestar.svg" class="block w-auto h-7" /> -->
        <LitestarLogo ref="logo" class="block w-auto h-6" />

        <UTooltip v-if="latestVersion" :text="`Latest release: v${stats?.version || 3}`" class="md:block">
          <UBadge variant="subtle" size="sm" class="-mb-[2px] rounded font-semibold text-[12px]/3" color="primary">
            v{{ latestVersion }}
          </UBadge>
        </UTooltip>

      </NuxtLink>
    </template>

    <UNavigationMenu :items="headerLinks" variant="link" :ui="{ linkLeadingIcon: 'hidden' }" />

    <template #right>
      <UTooltip text="Search" :kbds="['meta', 'K']">
        <UContentSearchButton />
      </UTooltip>

      <UColorModeButton />

      <UTooltip text="Litestar on GitHub">
        <UButton
          icon="i-simple-icons-github"
          to="https://github.com/litestar-org/litestar"
          target="_blank"
          variant="ghost"
          color="neutral"
          :label="stats ? formatNumber(stats.stars) : '...'"
          :ui="{
            label: 'hidden sm:inline-flex'
          }"
        >
          <span class="sr-only">Litestar on GitHub</span>
        </UButton>
      </UTooltip>

      <UTooltip text="Discord">
        <UButton
          icon="i-simple-icons-discord"
          to="https://discord.gg/litestar"
          target="_blank"
          variant="ghost"
          color="neutral"
          :ui="{ label: 'hidden sm:inline-flex' }"
        >
          <span class="sr-only">Litestar on Discord</span>
        </UButton>
      </UTooltip>
    </template>

    <template #body>
      <!-- <UContentNavigation :navigation="mobileNavigation" :default-open="defaultOpen" highlight /> -->
    </template>
  </UHeader>
</template>