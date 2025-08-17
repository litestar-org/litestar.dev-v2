<script setup lang="ts">
const title = 'About Litestar'
const description = 'Learn about the Litestar organization, our community-driven approach, and the team of maintainers who make it all possible.'

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

const urlGitHubMember = 'https://github.com/orgs/litestar-org/people'

const maintainers = [
    {
    name: 'Janek Nouvertné',
    role: 'Maintainer',
    avatar: 'https://github.com/provinzkraut.png',
    github: 'https://github.com/provinzkraut'
  },
  {
    name: 'Cody Fincher',
    role: 'Maintainer',
    avatar: 'https://github.com/cofin.png',
    github: 'https://github.com/cofin'
  },
  {
    name: 'Jacob Coffee',
    role: 'Maintainer', 
    avatar: 'https://github.com/JacobCoffee.png',
    github: 'https://github.com/JacobCoffee'
  },
  {
    name: 'Peter Schutt',
    role: 'Maintainer',
    avatar: 'https://github.com/peterschutt.png',
    github: 'https://github.com/peterschutt'
  },
  {
    name: 'Andrew Truong',
    role: 'Maintainer',
    avatar: 'https://github.com/adhtruong.png',
    github: 'https://github.com/adhtruong'
  },
  {
    name: 'Julien Courtès',
    role: 'Maintainer',
    avatar: 'https://github.com/Kumzy.png',
    github: 'https://github.com/Kumzy'
  }
]

const features = [
  {
    icon: 'i-lucide-users',
    title: 'Community-Driven',
    description: 'Developed by volunteers and outside contributors with an open, welcoming approach to all participants.'
  },
  {
    icon: 'i-lucide-heart',
    title: 'Every Contribution Welcome',
    description: 'We follow the All Contributors guidelines and appreciate every form of contribution, big or small.'
  },
  {
    icon: 'i-lucide-git-branch',
    title: 'Flat Organization',
    description: 'Simple structure with Members and Maintainers, focusing on collaboration over hierarchy.'
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'Open Participation',
    description: 'Join our community through issues, discussions, pull requests, and code contributions.'
  }
]

const stats = [
  {
    label: 'Maintainers',
    value: '6',
    icon: 'i-lucide-users',
    to: '#maintainers'
  },
  {
    label: 'Version',
    value: '2.17',
    icon: 'i-lucide-tag',
    to: 'https://github.com/litestar-org/litestar/releases'
  },
  {
    label: 'License',
    value: 'MIT',
    icon: 'i-lucide-file-text',
    to: 'https://github.com/litestar-org/litestar/blob/main/LICENSE'
  },
  {
    label: 'Community',
    value: 'Global',
    icon: 'i-lucide-globe',
    to: 'https://discord.gg/litestar'
  }
]

const organizationalStructure = [
  {
    icon: 'i-lucide-user-check',
    title: 'Members',
    description: 'Significant contributors with limited admin permissions who have made notable contributions to the project.',
    to: 'https://github.com/orgs/litestar-org/people',
    target: '_blank'
  },
  {
    icon: 'i-lucide-crown',
    title: 'Maintainers',
    description: 'Long-term members deeply involved in project development. Can be nominated by any organization member and require unanimous approval from current maintainers.'
  }
]
</script>

<template>
  <UContainer>
    <UPageHero
      :title="title"
      :description="description"
      icon="i-lucide-building-2"
    />

    <UPage>
      <UPageBody>
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

        <!-- Organization Overview -->
        <UPageSection
          title="Our Organization"
          description="Litestar is developed by volunteers and outside contributors, led by a dedicated team of Maintainers. Our community-driven project encourages user involvement and values every contribution."
          :ui="{
            title: 'text-center',
            description: 'text-center',
            root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
            features: 'xl:grid-cols-4 lg:gap-10'
          }">
            <UPageGrid
              :ui="{ wrapper: 'grid grid-cols-1 lg:grid-cols-2 gap-6' }"
            >
              <UPageCard
                v-for="feature in features"
                :key="feature.title"
                :icon="feature.icon"
                :title="feature.title"
                :description="feature.description"
              />
            </UPageGrid>
        </UPageSection>

        <!-- Project History -->
        <UPageSection
          title="Project History"
          description="Litestar has evolved significantly since its inception, originally starting as 'Starlite'. The rebranding to 'Litestar' in version 2.0 marked a new chapter, avoiding confusion with similar frameworks."
          :ui="{
            title: 'text-center',
            description: 'text-center',
            root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
            features: 'xl:grid-cols-4 lg:gap-10'
          }"
          >
          <div class="max-w-4xl mx-auto">
            <UCard>
              <template #header>
                <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <UIcon name="i-lucide-history" class="w-6 h-6" />
                  Project History
                </h2>
              </template>
              <div class="space-y-6">
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <UIcon name="i-lucide-star" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Originally "Starlite"</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      The project began its journey under the name "Starlite", establishing itself as a powerful ASGI framework.
                    </p>
                  </div>
                </div>
                <div class="flex items-start gap-4">
                  <div class="flex-shrink-0 w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                    <UIcon name="i-lucide-arrow-right" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Renamed to "Litestar" in v2.0</h3>
                    <p class="text-gray-600 dark:text-gray-400">
                      To avoid confusion with similar framework names, we rebranded to "Litestar" with version 2.0, 
                      marking a new chapter in our development.
                    </p>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </UPageSection>

        <!-- Organizational Structure -->
        <UPageSection>
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Organizational Structure
            </h2>
            <div class="grid md:grid-cols-2 gap-8">
              <UCard
                v-for="role in organizationalStructure"
                :key="role.title"
                :to="role.to"
                :target="role.target"
              >
                <template #header>
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <UIcon :name="role.icon" class="w-5 h-5" />
                    {{ role.title }}
                  </h3>
                </template>
                <p class="text-gray-600 dark:text-gray-400">
                  {{ role.description }}
                </p>
              </UCard>
            </div>
          </div>
        </UPageSection>

        <!-- Maintainers Team -->
        <UPageSection
          title="Meet Our Maintainers and Members"
          description="Litestar is developed by a dedicated team of maintainers and contributors who ensure the project's success."
        >
            <!-- <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> -->
            <UPageGrid>
              <UCard
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
                  <div>
                    <h3 class="font-semibold text-gray-900 dark:text-white">
                      {{ maintainer.name }}
                    </h3>
                    <UBadge
                      class="shine mb-3"
                      variant="subtle"
                      color="primary"
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
              </UCard>
            </UPageGrid>

            <!-- </div> -->
        </UPageSection>

        <!-- Get Involved -->
        <UPageSection>
          <div class="max-w-4xl mx-auto">
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
          </div>
        </UPageSection>

        <!-- Ways to Contribute -->
        <UPageSection>
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Ways to Contribute
            </h2>
            <div class="grid md:grid-cols-2 gap-6">
              <div class="flex items-start gap-4">
                <UIcon name="i-lucide-bug" class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Opening Issues</h3>
                  <p class="text-gray-600 dark:text-gray-400">Report bugs, request features, or ask questions to help improve the project.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <UIcon name="i-lucide-message-square" class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Participating in Discussions</h3>
                  <p class="text-gray-600 dark:text-gray-400">Share ideas, help others, and engage with the community in our discussions.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <UIcon name="i-lucide-eye" class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Reviewing Pull Requests</h3>
                  <p class="text-gray-600 dark:text-gray-400">Help review code changes and provide feedback to maintain high quality.</p>
                </div>
              </div>
              
              <div class="flex items-start gap-4">
                <UIcon name="i-lucide-code" class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Contributing Code</h3>
                  <p class="text-gray-600 dark:text-gray-400">Submit bug fixes, new features, or improvements to the codebase.</p>
                </div>
              </div>
            </div>
          </div>
        </UPageSection>
      </UPageBody>
    </UPage>
  </UContainer>
</template>
