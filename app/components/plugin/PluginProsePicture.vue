<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { extractDualModeSources } from '~/utils/colorModePicture'

// Overrides the `picture` prose component when rendering plugin READMEs. GitHub
// banners switch via `<source media="(prefers-color-scheme: …)">`, which follows
// the OS theme — but the site toggle is class-based (`.dark` on <html>). We
// render the two images ourselves and toggle them with Tailwind `dark:` classes
// so the banner tracks the site toggle. CSS-class toggling (not a `useColorMode`
// branch) is required because the theme is unknown during static prerender.
//
// Keeps a `<picture>` root so the existing wrapper styling in
// app/pages/plugins/[slug].vue (`first:[&_picture]:…`) still applies. When the
// picture is not a dual-mode banner, the original slot renders unchanged.
const slots = useSlots()
const dual = computed(() => extractDualModeSources(slots.default?.() ?? []))
</script>

<template>
  <picture v-if="dual">
    <img
      :src="dual.light"
      :alt="dual.alt"
      :width="dual.width"
      :height="dual.height"
      class="dark:hidden"
    />
    <img
      :src="dual.dark"
      :alt="dual.alt"
      :width="dual.width"
      :height="dual.height"
      class="hidden dark:block"
    />
  </picture>
  <picture v-else>
    <slot />
  </picture>
</template>
