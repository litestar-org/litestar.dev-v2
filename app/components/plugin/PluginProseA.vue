<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="inline-block mr-1 text-primary hover:text-primary/80"
  >
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
import { hasProtocol, joinURL } from 'ufo'

const route = useRoute()
const { data: plugin } = useNuxtData(`plugin-${route.params?.slug}`)

const props = defineProps({
  href: {
    type: String,
    default: ''
  },
  target: {
    type: String,
    default: undefined,
    required: false
  }
})

const href = computed(() => {
  if (hasProtocol(props.href) || !plugin.value?.github) return props.href
  return joinURL(plugin.value.github, 'blob', plugin.value.stats?.defaultBranch || 'main', props.href)
})
</script>