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
        <!-- <template v-for="({ tier, sponsors }) of sponsorGroups" :key="tier"> -->
          <div class="w-full mb-24">
            <!-- <UBadge color="neutral" variant="subtle" class="capitalize mb-2">
              {{ tier }} sponsors
            </UBadge> -->

            <div class="w-full border border-default rounded-lg">
              <table class="w-full">
                <tbody>
                  <template v-for="(_, rowIndex) in Math.ceil(sponsors.length / 3)" :key="rowIndex">
                    <tr>
                      <template v-for="colIndex in 3" :key="colIndex">
                        <td
                          v-if="(rowIndex * 3) + colIndex - 1 < sponsors.length"
                          class="border-b border-r border-default p-0 w-1/3 h-[120px]"
                          :class="{
                            'border-r-0': colIndex === 3,
                            'border-b-0': rowIndex === Math.ceil(sponsors.length / 3) - 1
                          }"
                        >
                          <NuxtLink
                            :to="sponsors[(rowIndex * 3) + colIndex - 1].url"
                            target="_blank"
                            class="flex items-center gap-2 justify-center h-full hover:bg-muted/50 transition-colors"
                          >
                            <NuxtImg
                              :src="`/sponsors/${sponsors[(rowIndex * 3) + colIndex - 1]?.image.src}`"
                              :alt="`${sponsors[(rowIndex * 3) + colIndex - 1]?.image.alt}`"
                              loading="lazy"
                              class="h-10 max-w-[140px] object-contain rounded-lg"
                              height="40"
                              width="40"
                            />
                            <span class="text-base hidden sm:block font-semibold">{{ sponsors[(rowIndex * 3) + colIndex - 1].title }}</span>
                          </NuxtLink>
                        </td>
                        <td
                          v-else
                          class="border-b border-r border-default p-0 w-1/3 h-[120px]"
                          :class="{
                            'border-r-0': colIndex === 3,
                            'border-b-0': rowIndex === Math.ceil(sponsors.length / 3) - 1
                          }"
                        >
                          <div class="h-full" />
                        </td>
                      </template>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        <!-- </template> -->
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
