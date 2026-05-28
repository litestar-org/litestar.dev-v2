<template>
  <UPageSection
    :title="sponsorsData.title"
    :description="sponsorsData.description"
    :links="sponsorsData.links"
    class="relative"
    :ui="{
      root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
    }"
  >
    <div class="flex flex-col items-center">
      <div class="w-full mb-24">
        <ul
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full border border-default rounded-lg overflow-hidden list-none p-0"
        >
          <li
            v-for="(sponsor, index) in sponsors"
            :key="sponsor.url"
            class="h-[120px] border-default"
            :class="{
              'border-r': (index + 1) % 3 !== 0,
              'border-b': index < sponsors.length - (sponsors.length % 3 || 3),
            }"
          >
            <NuxtLink
              :to="sponsor.url"
              target="_blank"
              class="flex items-center gap-2 justify-center h-full hover:bg-muted/50 transition-colors"
            >
              <NuxtImg
                :src="`/sponsors/${sponsor.image.src}`"
                :alt="sponsor.image.alt"
                loading="lazy"
                class="h-10 max-w-[140px] object-contain rounded-lg"
                height="40"
                width="40"
              />
              <span class="text-base hidden sm:block font-semibold">{{
                sponsor.title
              }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
import type { Sponsor } from '~/types'

interface CTA {
  label: string
  to?: string
  icon?: string
}

interface SponsorsData {
  title: string
  description: string
  cta: CTA
}

interface Props {
  sponsors: Sponsor[]
  sponsorsData: SponsorsData
}

const props = defineProps<Props>()

const config = useRuntimeConfig()
</script>
