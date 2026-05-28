<script setup lang="ts">
import { joinURL } from 'ufo'
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const baseURL = import.meta.dev ? '/' : useRuntimeConfig().app.baseURL

const isNotFound = computed(() => props.error?.statusCode === 404)
const headline = computed(() =>
  isNotFound.value ? 'Page not found' : 'Something went wrong',
)
const description = computed(() =>
  isNotFound.value
    ? 'Looks like this page took a wrong turn into hyperspace. The link may be broken or the page may have moved.'
    : props.error?.message || 'An unexpected error occurred. Please try again.',
)

useHead({
  htmlAttrs: { lang: 'en' },
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'robots', content: 'noindex' },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: joinURL(baseURL, 'logo.svg'),
    },
  ],
})

useSeoMeta({
  title: () => headline.value,
  titleTemplate: '%s · Litestar',
  description: () => description.value,
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <UApp>
    <div class="relative flex flex-col min-h-screen">
      <AppHeader />

      <UMain class="relative flex-1 flex items-center justify-center">
        <HeroBackground
          class="absolute w-full -top-px text-primary shrink-0 -z-10"
        />

        <UContainer class="py-16 sm:py-24 lg:py-32">
          <UError
            as="section"
            :error="error"
            :clear="false"
            :ui="{
              root: 'text-center max-w-2xl mx-auto flex flex-col items-center',
              leading: 'mb-6',
              statusCode:
                'text-7xl sm:text-8xl font-bold text-primary leading-none',
              statusMessage:
                'text-3xl sm:text-4xl font-semibold text-highlighted mt-4',
              message: 'text-base sm:text-lg text-muted mt-4 max-w-prose',
              links: 'mt-10 flex flex-wrap justify-center gap-3',
            }"
          >
            <template #leading>
              <LitestarLogo class="block w-auto h-12 sm:h-14" />
            </template>

            <template #statusMessage>
              {{ headline }}
            </template>

            <template #message>
              {{ description }}
            </template>

            <template #links>
              <UButton
                size="xl"
                trailing-icon="i-lucide-arrow-right"
                @click="handleError"
              >
                Back to home
              </UButton>
              <UButton
                to="https://docs.litestar.dev/"
                target="_blank"
                size="xl"
                color="neutral"
                variant="subtle"
                leading-icon="i-lucide-book-open"
              >
                Read the docs
              </UButton>
            </template>
          </UError>
        </UContainer>
      </UMain>

      <AppFooter />
    </div>
  </UApp>
</template>
