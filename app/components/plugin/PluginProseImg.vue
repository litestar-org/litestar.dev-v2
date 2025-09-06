<script setup lang="ts">
import { hasProtocol, joinURL } from 'ufo'

const route = useRoute()
const { data: plugin } = useNuxtData(`plugin-${route.params?.slug}`)

interface Source {
  srcset: string
  media?: string
  type?: string
  sizes?: string
  theme?: 'light' | 'dark'
}


const props = defineProps({
  src: {
    type: String,
    default: ''
  },
  alt: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: undefined
  },
  height: {
    type: [String, Number],
    default: undefined
  },
  sources: {
    type: [Array, String],
  }
})
const src = computed(() => {
  if (hasProtocol(props.src) || !plugin.value?.repo) return props.src
  const repo = plugin.value.repo.split('#')[0]
  return joinURL('https://raw.githubusercontent.com/', repo, plugin.value.stats.defaultBranch, props.src)
})
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
  >
</template>