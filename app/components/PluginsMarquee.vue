<script setup lang="ts">
import { pluginImage, pluginIcon } from '~/composables/usePlugins'
import type { Plugin } from '~/types'

const props = defineProps<{
  plugins: Plugin[]
}>()

const shuffleArray = (array: Plugin[]) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i]!, shuffled[j]!] = [shuffled[j]!, shuffled[i]!]
  }
  return shuffled
}

const marqueePluginsData = useState<Plugin[][]>('marqueePlugins', () => [])

const getRandomDelay = (rowIndex: number, index: number) => {
  const baseDelay = (rowIndex * 0.3) + (index * 0.05)
  const randomOffset = ((rowIndex * 13) + index) % 10 * 0.1
  return baseDelay + randomOffset
}

const initMarqueePlugins = () => {
  if (marqueePluginsData.value.length) return

  const allPlugins: Plugin[] = props.plugins
  const limitedPlugins = shuffleArray(allPlugins).slice(0, 50)

  const row1: Plugin[] = shuffleArray(limitedPlugins)
  const row2: Plugin[] = shuffleArray(limitedPlugins)
  const row3: Plugin[] = shuffleArray(limitedPlugins)

  marqueePluginsData.value = [row1, row2, row3]
}

watch(() => props.plugins, (newVal?: Plugin[]) => {
  if (newVal?.length && !marqueePluginsData.value.length) {
    initMarqueePlugins()
  }
}, { immediate: true })
</script>

<template>
  <div class="absolute isolate inset-0 overflow-hidden">
    <div class="flex flex-col justify-between pt-4">
      <UPageMarquee
        v-for="(row, rowIndex) in marqueePluginsData"
        :key="rowIndex"
        :reverse="rowIndex % 2 === 1"
        :overlay="false"
        :ui="{
          root: `[--gap:--spacing(4)] [--duration:400s]`
        }"
        class="mb-(--gap)"
      >
        <Motion
          v-for="(module, index) in row"
          :key="`${rowIndex}-${index}`"
          :initial="{
            scale: 0.5,
            opacity: 0,
            filter: 'blur(10px)'
          }"
          :animate="{
            scale: 1,
            opacity: 1,
            filter: 'blur(0px)'
          }"
          :transition="{
            delay: getRandomDelay(rowIndex, index)
          }"
          class="flex items-center justify-center size-16 rounded-lg bg-muted p-2 border border-default dark:shadow-lg"
        >
          <UAvatar
            :src="pluginImage(module.icon)"
            :icon="pluginIcon(module.category)"
            :alt="module.name"
            size="lg"
            class="rounded-none bg-transparent"
          />
        </Motion>
      </UPageMarquee>
    </div>

    <div class="absolute left-0 top-0 bottom-0 w-1/2 z-10 bg-linear-to-bl from-default/30 to-default to-40%" />
    <div class="absolute right-0 top-0 bottom-0 w-1/2 z-10 bg-linear-to-br from-default/30 to-default to-40%" />
    <div class="absolute top-0 left-0 right-0 size-full z-10 bg-linear-to-t from-default to-default/15" />
  </div>
</template>