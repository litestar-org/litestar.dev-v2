<script setup lang="ts">

definePageMeta({
  heroBackground: 'opacity-70 -z-10'
})

const { fetchList, providers } = useDeploy()

const title = 'Deploy Litestar App'
const description = 'Discover the different ways to deploy your Litestar project on different hosting providers.'
const links: ButtonProps[] = [
  {
    icon: 'i-lucide-rocket',
    label: 'Deployment Guide',
    to: '/docs/getting-started/deployment',
    color: 'neutral',
    size: 'md'
  }
]
useSeoMeta({
  titleTemplate: '%s',
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

defineOgImageComponent('Docs', {
  title: 'Deploy Litestar',
  description
})

await fetchList()
</script>

<template>
  <UContainer>
    <UPageHero
      :title="title"
      :description="description"
      :links="links"
    />

    <UPage>
      <UPageBody>
        <UPageGrid>
          <UPageCard
            v-for="(deployment, index) in providers"
            :key="index"
            :to="deployment.path"
            :title="deployment.title"
            :description="deployment.description"
          >
            <template #leading>
              <!-- <NuxtImg v-if="deployment.logoSrc" :src="deployment.logoSrc" width="10" height="10" class="w-10 h-10" /> -->
              <!-- <UIcon v-else :name="deployment.logoIcon" class="size-10 text-black dark:text-white" /> -->
            </template>
            <template #title>
              {{ deployment.title }}
            </template>
            <template #description>
              <span class="line-clamp-2">{{ deployment.description }}</span>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageBody>
    </UPage>
  </UContainer>
</template>

<style>
.gradient {
  background-image: linear-gradient(105deg, #f8fafc 5.03%, #f1f5f9 102.15%);
}
.dark .gradient {
  background-image: linear-gradient(105deg, #020420 5.03%, #010211 102.15%);
}
</style>