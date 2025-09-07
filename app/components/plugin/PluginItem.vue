<script setup lang="ts">
import type { PluginsCollectionItem } from '@nuxt/content';
import type { Plugin } from '~/types'

const emit = defineEmits<{
  add: [plugin: Plugin]
  remove: [plugin: Plugin]
}>()

const { plugin, showBadge = true, isAdded } = defineProps<{
  plugin: PluginC
  showBadge?: boolean
  isAdded: boolean
}>()

const { copy } = useClipboard()
const { selectedSort } = usePlugins()
const date = computed(() => {
  if (selectedSort.value.key === 'updated_at' && plugin?.updated_at) {
    return useTimeAgo(plugin.updated_at)
  }

  if (plugin?.created_at) {
    return useTimeAgo(plugin.created_at)
  }
  
  return 'N/A'
})

const { selectedPackageManager } = usePackageManager()

function copyInstallCommand(pluginName: string) {
  const command = `${selectedPackageManager.value.command} ${pluginName}`
  copy(command, { title: 'Command copied to clipboard:', description: command })
}

function togglePlugin(plugin: PluginsCollectionItem) {
  console.log(plugin)
  if (isAdded) {
    emit('remove', plugin)
  } else {
    emit('add', plugin)
  }
}

function handleCardClick(event: MouseEvent) {
  if (event.shiftKey) {
    event.preventDefault()
    togglePlugin(plugin)
  }
}

const items = computed(() => [
  [
    {
      label: isAdded ? 'Remove plugin' : 'Add plugin',
      icon: isAdded ? 'i-lucide-minus' : 'i-lucide-plus',
      onSelect: () => togglePlugin(plugin)
    },
    {
      label: 'Copy install command',
      icon: 'i-lucide-terminal',
      onSelect: () => copyInstallCommand(plugin?.name)
    }
  ],
  [
    {
      icon: 'i-lucide-book',
      label: 'Documentation',
      to: plugin?.website ? `${plugin?.website}?utm_source=nuxt.com&utm_medium=aside-module&utm_campaign=nuxt.com` : '#',
      target: '_blank'
    },
    {
      label: 'View on GitHub',
      icon: 'i-lucide-github',
      to: plugin?.repo ? `https://github.com/${plugin?.repo}` : '#',
      target: '_blank'
    },
    {
      label: 'View on pypi',
      icon: 'i-lucide-package',
      to: plugin?.pypi ? `https://pypi.org/project/${plugin?.pypi}` : '#',
      target: '_blank'
    }
  ]
])
</script>

<template>
  <UContextMenu :items="items">
    <UPageCard
      :to="`/plugins/${plugin?.key}`"
      :title="plugin?.name"
      :description="plugin?.description"
      class="group"
      variant="subtle"
      :ui="{
        root: isAdded ? 'ring-primary hover:ring-primary' : '',
        description: 'line-clamp-2 text-muted text-sm',
        container: 'flex flex-col',
        wrapper: 'flex flex-col min-h-0 items-start',
        body: 'flex-none',
        footer: 'w-full mt-auto pointer-events-auto pt-4 z-[1]'
      }"
      @click="handleCardClick"
    >
      <template #leading>
        <UAvatar
          :src="pluginImage(plugin?.icon)"
          :icon="pluginIcon(plugin?.category)"
          :alt="plugin?.name"
          size="md"
          class="rounded-md bg-transparent"
        />
      </template>

      <UBadge
        v-if="showBadge && plugin?.type === 'official'"
        class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
        variant="subtle"
        color="primary"
        label="Official"
      />

      <template #footer>
        <USeparator type="dashed" class="mb-4" />

        <div class="flex items-center justify-between gap-3 -my-1 text-muted">
          <div class="flex items-center gap-3 flex-wrap">
            <UTooltip text="Monthly PyPi Downloads">
              <NuxtLink
                class="flex items-center gap-1 hover:text-highlighted"
                :to="plugin?.npm ? `https://pypi.org/project/${plugin.pypi}` : '#'"
                target="_blank"
              >
                <UIcon name="i-lucide-circle-arrow-down" class="size-4 shrink-0" />
                <span class="text-sm font-medium whitespace-normal">{{ formatNumber(plugin?.monthly_downloads || 0) }}</span>
              </NuxtLink>
            </UTooltip>

            <UTooltip text="GitHub Stars">
              <NuxtLink
                class="flex items-center gap-1 hover:text-highlighted"
                :to="plugin?.repo ? `https://github.com/${plugin?.repo}` : '#'"
                target="_blank"
              >
                <UIcon name="i-lucide-star" class="size-4 shrink-0" />
                <span class="text-sm font-medium whitespace-normal">{{ formatNumber(plugin.stars || 0) }}</span>
              </NuxtLink>
            </UTooltip>
          </div>

          <div class="flex items-center gap-2">
            <UTooltip text="Copy install command">
              <UButton
                icon="i-lucide-terminal"
                color="neutral"
                size="xs"
                variant="outline"
                @click="copyInstallCommand(plugin?.name)"
              >
                <span class="sr-only">Copy command to install {{ plugin?.name }}</span>
              </UButton>
            </UTooltip>
          </div>
        </div>
      </template>
    </UPageCard>
  </UContextMenu>
</template>

<style lang="postcss" scoped>
.shine {
  text-decoration: none;
  display: inline-block;
  mask-image: linear-gradient(-75deg, rgba(255,255,255,.8) 30%, #fff 50%, rgba(255,255,255,.8) 70%);
  mask-size: 200%;
  animation: shine 2s linear infinite;
}

@keyframes shine {
  from { -webkit-mask-position: 150%; }
  to { -webkit-mask-position: -50%; }
}
</style>