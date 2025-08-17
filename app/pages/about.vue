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
  },
  {
    name: 'DanCardin',
    role: 'Member',
    avatar: 'https://github.com/DanCardin.png',
    github: 'https://github.com/DanCardin'
  },
  {
    name: 'Euri10',
    role: 'Member',
    avatar: 'https://github.com/Euri10.png',
    github: 'https://github.com/Euri10'
  }, 
  {
    name: 'Harshal Laheri',
    role: 'Member',
    avatar: 'https://github.com/Harshal6927.png',
    github: 'https://github.com/Harshal6927'
  }, 
  {
    name: 'Sobolevn',
    role: 'Member',
    avatar: 'https://github.com/sobolevn.png',
    github: 'https://github.com/sobolevn'
  }, 
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
    icon: 'i-lucide-message-circle',
    title: 'Open Participation',
    description: 'Join our community through issues, discussions, pull requests, and code contributions.'
  }
]

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

const contributionWays = [
  {
    icon: 'i-lucide-bug',
    title: 'Opening Issues',
    description: 'Report bugs, request features, or ask questions to help improve the project.',
    to: 'https://github.com/litestar-org/litestar/issues/new'
  },
  {
    icon: 'i-lucide-message-square',
    title: 'Participating in Discussions',
    description: 'Share ideas, help others, and engage with the community in our discussions.',
    to: 'https://github.com/litestar-org/litestar/discussions'
  },
  {
    icon: 'i-lucide-eye',
    title: 'Reviewing Pull Requests',
    description: 'Help review code changes and provide feedback to maintain high quality.',
    to: 'https://github.com/litestar-org/litestar/pulls'
  },
  {
    icon: 'i-lucide-code',
    title: 'Contributing Code',
    description: 'Submit bug fixes, new features, or improvements to the codebase.',
    to: 'https://github.com/litestar-org/litestar/blob/main/CONTRIBUTING.md'
  }
]
</script>

<template>
    <UPageHero
      :title="title"
      :description="description"
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

      <!-- Organization Overview -->
      <UPageSection
        title="Our Organization"
        description="Litestar is developed by volunteers and outside contributors, led by a dedicated team of Maintainers. Our community-driven project encourages user involvement and values every contribution."
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
        }">
          <UPageGrid
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
          <UTimeline :items="timelineItems" :default-value="1" />
        </div>
      </UPageSection>

      <!-- Maintainers Team -->
      <UPageSection
        title="Meet Our Maintainers and Members"
        description="Litestar is developed by a dedicated team of maintainers and contributors who ensure the project's success."
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
          <AboutContributors />
      </UPageSection>

      <!-- Ways to Contribute and Get Involved -->
      <UPageSection
        title="Ways to Contribute"
        description="Explore the various ways you can contribute to the Litestar project and get involved with the community."
        :ui="{
          title: 'text-center',
          description: 'text-center',
          root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
          features: 'xl:grid-cols-4 lg:gap-10'
        }">
        <UPageGrid class="grid-cols-1 md:grid-cols-2">
          <UPageCard
            v-for="way in contributionWays"
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
