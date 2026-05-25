<script setup lang="ts">
import { joinURL } from 'ufo'

useHead({
  titleTemplate: (title) =>
    title
      ? `${title} · Litestar`
      : 'Litestar: The Modern Python ASGI Framework',
})

if (import.meta.server) {
  // public/ assets are served under the app baseURL in production (GitHub Pages
  // serves the site at /litestar.dev-v2/), but Vite serves them at root in dev.
  // Build the href per environment, otherwise the favicon 404s on the deploy.
  const baseURL = import.meta.dev ? '/' : useRuntimeConfig().app.baseURL

  useHead({
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: joinURL(baseURL, 'logo.svg'),
      },
    ],
    htmlAttrs: {
      lang: 'en',
    },
  })
  useSeoMeta({
    ogSiteName: 'Litestar',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterSite: 'LitestarAPI',
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
