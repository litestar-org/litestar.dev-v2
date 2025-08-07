<script setup lang="ts">
useHead({
  titleTemplate: title => title ? `${title} · Litestar` : 'Litestar: The Modern Python ASGI Framework',
})

if (import.meta.server) {
  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }
    ],
    htmlAttrs: {
      lang: 'en'
    }
  })
  useSeoMeta({
    ogSiteName: 'Litestar',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: 'LitestarAPI'
  })
}
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
