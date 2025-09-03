<template>
  <UPageSection
    title="Unlock synergy, seamless integrations with Litestar"
    description="Explore Litestar seamless integrations with other tools and platforms, enhancing productivity and workflow efficiency."
    :ui="{
      root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
      title: 'text-left',
      description: 'text-left text-lg text-muted-foreground max-w-3xl'
    }"
  >

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
      <UPageCard
        v-for="integration in integrations"
        :key="integration.name"
        class="h-full"
        variant="subtle"
        :to="integration.repo"
        target="_blank"
        :ui="{
          root: 'border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-2xl p-6',
          container: 'space-y-4'
        }"
      >
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl flex items-center justify-center">
              <UIcon :name="integration.icon" :alt="`${integration.name} icon`" class="w-7 h-7 object-contain" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ integration.name }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {{ integration.description }}
            </p>
          </div>
        </div>
      </UPageCard>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
interface Integration {
  name: string
  description: string
  repo: string
  icon: string
}

const integrations: Integration[] = [
  {
    name: 'Scalar',
    description: 'Scalar integration.',
    repo: 'https://github.com/scalar/scalar',
    icon: 'i-simple-icons-scalar'
  },
  {
    name: 'RapiDoc',
    description:'RapiDoc integration.',
    repo: 'https://github.com/rapi-doc/RapiDoc',
    icon: 'i-custom-rapidoc'
  },
  {
    name: 'ReDoc',
    description: 'ReDoc integration.',
    repo: 'https://github.com/Redocly/redoc',
    icon: 'i-custom-redoc'
  },
  {
    name: 'Spotlight Elements',
    description: 'Elements integration.',
    repo: 'https://github.com/stoplightio/elements',
    icon: 'i-custom-elements'
  },
  {
    name: 'Swagger UI',
    description: 'Swagger UI integration.',
    repo: 'https://github.com/swagger-api/swagger-ui',
    icon: 'i-custom-swagger-ui'
  },
  {
    name: 'YAML',
    description: 'YAML integration.',
    repo: 'https://yaml.org/',
    icon: 'i-simple-icons-yaml'
  }
]
</script>