<template>
  <UPageSection
    :title="statsData.title"
    :description="statsData.description"
    class="relative"
    :ui="{
      root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default'
    }"
  >
    <div class="flex flex-col md:flex-row gap-4">
      <div class="md:w-1/3 flex flex-col gap-4">
        <UPageCard class="flex-1" variant="subtle" to="https://pypi.org/project/litestar/">
          <div class="flex items-center gap-3">
            <div class="rounded-lg bg-default p-2 flex items-center justify-center border border-default">
              <UIcon name="i-custom-pypi" class="size-6" />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-lg text-highlighted">
                {{ formatNumber(stats?.monthlyDownloads || 0) }}
              </span>
              <p class="text-sm">
                Monthly downloads
              </p>
            </div>
          </div>
        </UPageCard>

        <UPageCard class="flex-1" variant="subtle" to="https://go.nuxt.com/github">
          <div class="flex items-center gap-2">
            <div class="rounded-lg bg-default p-2 flex items-center justify-center border border-default">
              <UIcon name="i-simple-icons-github" class="size-6" />
            </div>
            <div class="flex flex-col">
              <span class="font-semibold text-lg text-highlighted">
                {{ formatNumber(stats?.stars || 0) }}
              </span>
              <p class="text-sm">
                GitHub Stars
              </p>
            </div>
          </div>
        </UPageCard>
      </div>

      <div class="md:w-2/3">
        <UPageCard class="h-full" variant="subtle" to="https://go.nuxt.com/github">
          <div class="flex flex-col items-center justify-around h-full">
            <span class="text-xl font-semibold">
              {{ statsData.community.title }}
            </span>
            <p class="text-muted text-center">
              {{ statsData.community.description }}
            </p>
            <UButton class="mt-4 w-fit" v-bind="statsData.cta" />
          </div>
        </UPageCard>
      </div>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
interface Stats {
  monthlyDownloads: number
  stars: number
}

interface Community {
  title: string
  description: string
}

interface CTA {
  label: string
  to?: string
  icon?: string
}

interface StatsData {
  title: string
  description: string
  community: Community
  cta: CTA
}

interface Props {
  stats: Stats | null
  statsData: StatsData
}

defineProps<Props>()
</script>