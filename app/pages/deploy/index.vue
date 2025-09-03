<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui-pro'

definePageMeta({
  heroBackground: 'opacity-70 -z-10'
})

const { fetchList, hostingProviders, deploymentTechnologies } = useDeploy()

const title = 'Deploy Litestar App'
const description = 'Discover the different ways to deploy your Litestar project on different hosting providers and deployment technologies.'
const links: ButtonProps[] = [
  {
    icon: 'i-lucide-rocket',
    label: 'Deployment Guide',
    to: '#',
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
        <!-- Hosting Providers Section -->
        <section class="mb-16">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Hosting Providers
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Choose from various cloud platforms and hosting services to deploy your Litestar application.
            </p>
          </div>
          
          <UPageGrid>
            <UPageCard
              v-for="(provider, index) in hostingProviders"
              :key="`provider-${index}`"
              :to="provider.path"
              :title="provider.title"
              :description="provider.description"
            >
              <template #leading>
                <UIcon v-if="provider.logoIcon" :name="provider.logoIcon" class="size-10 text-black dark:text-white" />
              </template>
              <UBadge
                v-if="provider.featured === true"
                class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
                variant="subtle"
                color="success"
                label="Recommended"
              />
              <template #title>
                {{ provider.title }}
              </template>
              
              <template #description>
                <span class="line-clamp-2">{{ provider.description }}</span>
              </template>
              
            </UPageCard>
          </UPageGrid>
        </section>

        <!-- Deployment Technologies Section -->
        <section>
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Deployment Technologies
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Select the right ASGI server or deployment technology to run your Litestar application efficiently.
            </p>
          </div>
          
          <UPageGrid>
            <UPageCard
              v-for="(tech, index) in deploymentTechnologies"
              :key="`tech-${index}`"
              :to="tech.path"
              :title="tech.title"
              :description="tech.description"
            >
              <template #leading>
                <NuxtImg v-if="tech.logoIcon && tech.logoIcon.endsWith('.png')" :src="tech.logoIcon" class="size-10 text-black dark:text-white" />
                <UIcon v-else-if="tech.logoIcon" :name="tech.logoIcon"   class="size-10 object-contain" alt="" />
              </template>
              <UBadge
                v-if="tech.featured === true"
                class="shine absolute top-4 right-4 sm:top-6 sm:right-6"
                variant="subtle"
                color="success"
                label="Recommended"
              />
              <template #title>
                {{ tech.title }}
              </template>
              <template #description>
                <span class="line-clamp-2">{{ tech.description }}</span>
              </template>
            </UPageCard>
          </UPageGrid>
        </section>
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