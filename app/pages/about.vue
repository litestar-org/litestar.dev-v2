<script setup lang="ts">

const [{ data: page }, { data: maintainers }] = await Promise.all([
  useAsyncData('about', () => queryCollection('about').first()),
  useAsyncData('maintainers', () => queryCollection('maintainers').order('role', 'ASC').all()),
])

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const title = page.value?.hero.title
const description = page.value?.hero.description

useSeoMeta({
  titleTemplate: '%s',
  title,
  description,
  ogDescription: description,
  ogTitle: title
})

defineOgImageComponent('Docs', {
  title: 'About Litestar',
  description
})

const stats = [
  {
    label: 'Maintainers',
    value: '6',
    icon: 'i-lucide-user-check',
    to: '#maintainers'
  },
  {
    label: 'Contributors',
    value: '160+',
    icon: 'i-lucide-users',
    to: 'https://discord.gg/litestar'
  },
  {
    label: 'Version',
    value: '3.0',
    icon: 'i-lucide-tag',
    to: 'https://github.com/litestar-org/litestar/releases'
  },
  {
    label: 'License',
    value: 'MIT',
    icon: 'i-lucide-file-text',
    to: 'https://github.com/litestar-org/litestar/blob/main/LICENSE'
  }

]

const timelineItems = [
  {
    title: 'Originally "Starlite"',
    description: 'The project began its journey under the name "Starlite", establishing itself as a powerful ASGI framework.',
    icon: 'i-lucide-star',
    color: 'primary',
    date: 'January 2022',
    value: 'initial'
  },
  {
    title: 'Renamed to "Litestar" in v2.0',
    description: 'To avoid confusion with similar framework names, we rebranded to "Litestar" with version 2.0, marking a new chapter in our development.',
    icon: 'i-lucide-arrow-right',
    color: 'primary',
    date: 'October 2023',
    value: 'litestar'
  },
  {
    title: 'Litestar v3.0 Release',
    description: 'Major version release bringing enhanced performance, new features, and improved developer experience to the framework.',
    icon: 'i-lucide-rocket',
    color: 'primary',
    date: 'Q3 2025',
    value: 'v3'
  }
]

</script>

<template>
    <UPageHero
      :title="page?.hero.title"
      :description="page?.hero.description"
      icon="i-lucide-building-2"
    />
      <!-- Stats Section -->
      <UPageSection>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UPageCard 
            v-for="stat in stats" 
            :key="stat.label"
            :to="stat.to"
            target="_blank"
            class="text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
          >
            <UIcon :name="stat.icon" class="w-8 h-8 mx-auto mb-3 text-primary-500 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" />
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-1">{{ stat.value }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
          </UPageCard>
        </div>
      </UPageSection>

      <USeparator />

      <!-- Organization Overview -->
      <UPageSection
        :title="page?.organization.title"
        :description="page?.organization.description"
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
        }">
          <UPageGrid
          >
            <UPageCard
              v-for="feature in page?.organization.features"
              :key="feature.title"
              :icon="feature.icon"
              :title="feature.title"
              :description="feature.description"
            />
          </UPageGrid>
      </UPageSection>

      <!-- Project History -->
      <UPageSection
        :title="page?.history.title"
        :description="page?.history.description"
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
          features: 'xl:grid-cols-4 lg:gap-10'
        }"
      >
        <div class="max-w-4xl mx-auto">
          <UTimeline :items="timelineItems" :default-value="1" />
        </div>
      </UPageSection>

      <!-- Maintainers Team -->
      <UPageSection
        :title="page?.maintainers.title"
        :description="page?.maintainers.description"
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
          features: 'xl:grid-cols-4 lg:gap-10'
        }"
      >
          <UPageGrid>
            <UPageCard
              v-for="maintainer in maintainers"
              :key="maintainer.name"
              class="text-center"
            >
              <div class="flex flex-col items-center space-y-4">
                <UAvatar
                  :src="maintainer.avatar"
                  :alt="maintainer.name"
                  size="xl"
                  class="ring-2 ring-primary-200 dark:ring-primary-800"
                />
                <div class="flex flex-col items-center">
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">
                    {{ maintainer.name }}
                  </h3>
                  <UBadge
                    class="shine mb-2"
                    variant="subtle"
                    :color="maintainer.role === 'Member' ? 'secondary' : 'primary'"
                    :label="maintainer.role"
                  />
                  <UButton
                    :to="maintainer.github"
                    target="_blank"
                    variant="ghost"
                    color="neutral"
                    icon="i-simple-icons-github"
                    size="sm"
                  >
                    GitHub
                  </UButton>
                </div>
              </div>
            </UPageCard>
          </UPageGrid>
          <p class="text-center text-lg sm:text-xl/8 text-muted">
            {{ page?.maintainers.acknowledgment }}
          </p>
          <p class="text-center text-lg sm:text-xl/8 text-muted">
            <UButton 
              :to="urlGitHubMember"
              icon="i-simple-icons-github" 
              target="_blank" 
              color="neutral">All contributors</UButton>
          </p>
      </UPageSection>

      <!-- Ways to Contribute and Get Involved -->
      <UPageSection
        :title="page?.contributing.title"
        :description="page?.contributing.description"
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
          features: 'xl:grid-cols-4 lg:gap-10'
        }">
        <UPageGrid class="grid-cols-1 md:grid-cols-2">
          <UPageCard
            v-for="way in page?.contributing.features"
            :key="way.title"
            :icon="way.icon"
            :title="way.title"
            :description="way.description"
            :to="way.to"
            target="_blank"
          />
        </UPageGrid>

        <!-- Get Involved -->
        <UCard class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950 border-primary-200 dark:border-primary-800">
            <div class="text-center">
              <UIcon name="i-lucide-heart" class="w-12 h-12 mx-auto mb-4 text-primary-600 dark:text-primary-400" />
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Get Involved
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400 mb-6">
                Every contribution is welcome and appreciated! Join our community and help make Litestar even better.
              </p>
              <div class="flex flex-wrap justify-center gap-4">
                <UButton
                  to="https://github.com/litestar-org/litestar"
                  target="_blank"
                  icon="i-simple-icons-github"
                  size="lg"
                >
                  Contribute on GitHub
                </UButton>
                <UButton
                  to="https://discord.gg/litestar"
                  target="_blank"
                  icon="i-simple-icons-discord"
                  variant="outline"
                  size="lg"
                >
                  Join Discord
                </UButton>
              </div>
            </div>
          </UCard>
      </UPageSection>
</template>
