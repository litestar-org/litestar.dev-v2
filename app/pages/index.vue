<script lang="ts" setup>
import type { TabsItem } from '@nuxt/ui'

const installCommands = ref<TabsItem[]>([
  {
    label: 'pip',
    icon: 'i-custom-python',
    content: 'pip install litestar'
  },
  {
    label: 'uv',
    icon: 'i-custom-uv',
    content: 'uv add litestar'
  }
])

definePageMeta({
  heroBackground: '-z-10'
})

const [{ data: page }] = await Promise.all([
  useAsyncData('index', () => queryCollection('index').first())
])

const { stats } = useStats()

const tabs = computed(() => page.value?.hero.tabs.map(tab => ({
  label: tab.title,
  icon: tab.icon,
  content: tab.content
})))

const { data: pluginsData } = await useAsyncData('plugins', async () => {
  const plugins = await import('~/data/plugins.json')
  return plugins.default
})

const officialPluginsLitestar = computed(() => 
  pluginsData.value?.filter(plugin => plugin.type === 'official') || []
)

// Template data organized by categories
const starterTemplates = [
  {
    title: 'Litestar',
    description: 'Starter for an API with OpenAPI documentation, validation and CRUD operations.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/basic-api',
    icon: 'i-lucide-leaf',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates/tree/main/basic-api' }]
  },
  {
    title: 'Minimal Litestar',
    description: 'Starter for a minimal API.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/hello-world',
    icon: 'i-lucide-globe',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates/tree/main/hello-world' }]
  },
  {
    title: 'Plugin',
    description: 'Starter for a plugin.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/cli-app',
    icon: 'i-lucide-terminal',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates/tree/main/cli-app' }]
  },
  {
    title: 'Advanced-Alchemy',
    description: 'Starter with ORM, database migration and services for a Rest API.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/sqlalchemy-template',
    icon: 'i-lucide-database',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates/tree/main/sqlalchemy-template' }]
  }
]

const fullTemplates = [
  {
    title: 'Litestar Fullstack',
    description: 'A complete fullstack web application template built with Litestar backend and modern frontend frameworks.',
    icon: 'i-lucide-user',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates' }]
  },
  {
    title: 'Litestar MCP',
    description: 'An AI-powered application template using Model Context Protocol to integrate Large Language Models.',
    icon: 'i-lucide-message-circle',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates' }]
  },
  {
    title: 'Litestar SQLStack',
    description: 'A comprehensive database-driven application template featuring Litestar with SQLSpec for type-safe database operations.',
    icon: 'i-lucide-bar-chart-big',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates' }]
  },
  {
    title: 'Litestar Inertia',
    description: 'A modern fullstack template using Inertia.js to seamlessly connect your Litestar backend with frontend frameworks.',
    icon: 'i-lucide-layers-3',
    framework: 'litestar',
    links: [{ to: 'https://github.com/litestar-org/litestar-templates' }]
  }
]

// Templates tab configuration
const templateTabs = ref([
  { key: 'starter', label: 'Starter', items: starterTemplates },
  { key: 'templates', label: 'Templates', items: fullTemplates }
])

const selectedTemplateTab = ref('starter')
const templates = computed(() => {
  const activeTab = templateTabs.value.find(tab => tab.key === selectedTemplateTab.value)
  return activeTab ? activeTab.items : starterTemplates
})
</script>

<template>
  <div v-if="page">
    <UPageHero
      class="relative"
      orientation="horizontal"
      :ui="{
        container: '!pb-20 py-24 sm:py-32 lg:py-40',
        title: 'text-5xl sm:text-6xl',
        wrapper: 'lg:min-h-[540px]'
      }"
    >
      <template #headline>
        <NuxtLink :to="page?.hero.cta.to">
          <UBadge variant="subtle" size="lg" class="px-3 relative rounded-full font-semibold dark:hover:bg-primary-400/15 dark:hover:ring-primary-700">
            {{ page?.hero.cta.label }}
            <UIcon
              v-if="page?.hero.cta.icon"
              :name="page?.hero.cta.icon"
              class="size-4 pointer-events-none"
            />
          </UBadge>
        </NuxtLink>
      </template>

      <template #title>
        The Modern <span class="text-primary">Python</span><br>ASGI Framework<br><span class="text-primary">Built to scale</span>
      </template>

      <template #description>
        <p>Build blazing fast APIs with automatic documentation, dependency injection, and type safety. Litestar makes complex web development simple.</p>
      </template>

      <template #links>
        <div class="flex flex-col gap-4">
          <div class="flex items-center flex-wrap gap-2">
            <UButton to="/docs/getting-started/installation" size="xl" trailing-icon="i-lucide-arrow-right">
              Get started
            </UButton>
            <UButton to="https://github.com/litestar-org/litestar" target="_blank" size="xl" color="neutral" variant="subtle" leading-icon="i-simple-icons-github">
              View on Github
            </UButton>
          </div>
          <UTabs
            :items="installCommands"
            color="neutral"
            :ui="{
              list: 'bg-muted/50 p-1 rounded-lg',
              trigger: 'text-sm data-[state=active]:bg-background',
              content: 'pt-2'
            }"
          >
            <template  #content="{ item }">
              <UInputCopy :value="item.content" :label="item.content" size="xl" />
            </template>
          </UTabs>
        </div>
      </template>

      <UPageCard
        class="overflow-auto lg:absolute [@media(min-width:2400px)]:relative lg:-mt-16 [@media(min-width:2400px)]:mt-8 right-0 [@media(min-width:2400px)]:right-auto w-screen lg:w-[calc(50%-2rem)] [@media(min-width:2400px)]:w-full max-w-[800px] [@media(min-width:2400px)]:mx-auto rounded-none lg:rounded-l-[calc(var(--ui-radius)*4)] [@media(min-width:2400px)]:rounded-2xl -mx-4 sm:-mx-6 lg:mx-0"
        variant="subtle"
        :ui="{ container: 'sm:pt-4.5 lg:pr-0 [@media(min-width:2400px)]:px-6 w-full' }"
      >
        <UTabs
          :items="tabs"
          :unmount-on-hide="false"
          :ui="{
            list: 'px-0 bg-transparent lg:pr-4 overflow-x-auto',
            trigger: 'group data-[state=active]:text-highlighted',
            indicator: 'bg-default',
            leadingIcon: 'group-data-[state=active]:text-primary size-4 hidden sm:inline-flex',
            content: 'lg:h-[450px] bg-default [@media(min-width:2400px)]:border-e [@media(min-width:2400px)]:border-default [@media(min-width:2400px)]:rounded-l-[calc(var(--ui-radius)*1.5)] transition-opacity duration-500 data-[state=inactive]:opacity-0 opacity-100'
          }"
        >
          <template #content="{ item, index }">
            <LazyMDC :value="item.content" :cache-key="`index-hero-tab-${index}`" hydrate-on-idle/>
          </template>
        </UTabs>
      </UPageCard>
    </UPageHero>
    
    <USeparator />

    <UPageSection
      :title="page?.features.title"
      :description="page?.features.description"
      :ui="{
        title: 'text-center',
        description: 'text-center',
        root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
        features: 'xl:grid-cols-4 lg:gap-10'
      }"
    >
      <template #features>
        <Motion
          v-for="(feature, index) in page?.features.features"
          :key="feature.title"
          as="li"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * index }"
          :in-view-options="{ once: true }"
        >
          <UPageCard
            v-bind="feature"
            orientation="vertical"
            target="_blank"
            class="h-full"
          />
        </Motion>
        <Motion
          as="li"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ delay: 0.1 * page?.features.features.length }"
          :in-view-options="{ once: true }"
          class="flex flex-col justify-center gap-4 p-4 h-full"
        >
          <span class="text-lg font-semibold">
            {{ page?.features.cta?.title }}
          </span>
          <div>
            <UButton :to="page?.features.cta?.to" :label="page?.features.cta?.label" trailing :icon="page?.features.cta?.icon" />
          </div>
        </Motion>
      </template>
    </UPageSection>

    <USeparator />

    <UPageSection
      :title="page.component_customization.title"
      :features="page.component_customization.features"
      :links="page.component_customization.links"
      orientation="horizontal"
    >
      <template #description>
        <MDC :value="page.component_customization.description" cache-key="index-component-customization-description" />
      </template>

      <MDC :value="page.component_customization.code" cache-key="index-component-customization-code" />
    </UPageSection>

    <USeparator />

    <UPageSection
      :description="page.modules.description"
      :links="page.modules.links"
      :ui="{
        root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
      }"
    >
      <template #title>
        <LazyMDC :value="page.modules.title" unwrap="p" cache-key="index-plugins-title" hydrate-never />
      </template>
      <UCarousel
        v-slot="{ item }"
        dots
        wheel-gestures
        arrows
        :items="officialPluginsLitestar"
        class="min-w-0"
        :ui="{
          container: 'ms-0 items-stretch',
          item: 'min-w-0 shrink-0 sm:basis-1/3 p-2',
          arrows: 'hidden 2xl:block'
        }"
      >
        <PluginItem v-if="item" :plugin="item" :show-badge="false" :is-added="false" class="min-h-full" />
      </UCarousel>
    </UPageSection>
    
    <USeparator />

    <UPageSection
      :title="page.templates.title"
      :description="page.templates.description"
      :links="page.templates.links"
      :features="page.templates.features"
      orientation="horizontal"
      :ui="{
        root: 'bg-gradient-to-b from-muted dark:from-muted/40 to-default',
      }"
    >
      <div class="space-y-6">
        <UTabs
          v-model="selectedTemplateTab"
          :items="templateTabs.map(tab => ({ key: tab.key, label: tab.label }))"
          color="neutral"
          :ui="{
            list: 'bg-muted/50 p-1 rounded-lg inline-flex',
            trigger: 'text-sm data-[state=active]:bg-background px-4 py-2'
          }"
        />
        <!-- Starter Templates Carousel -->
        <UCarousel
          v-if="selectedTemplateTab === 'starter'"
          v-slot="{ item }"
          loop
          dots
          wheel-gestures
          arrows
          :contain-scroll="false"
          :autoplay="{ delay: 5000 }"
          :items="starterTemplates"
          :ui="{
            container: 'py-px',
            viewport: 'px-px'
          }"
        >
          <UPageCard
            :to="item.links?.[0]?.to"
            :icon="item.icon"
            :title="item.title"
            :description="item.description"
            target="_blank"
            variant="subtle"
            class="group rounded-md h-full"
            :ui="{
              container: 'p-4 h-full flex flex-col',
              wrapper: 'flex-col items-start gap-3 flex-1',
              leading: 'mb-0',
              leadingIcon: 'text-primary size-6',
              title: 'text-lg font-semibold',
              description: 'text-sm text-muted-foreground flex-1'
            }"
          />
        </UCarousel>

        <!-- Full Templates Carousel -->
        <UCarousel
          v-else
          v-slot="{ item }"
          loop
          dots
          fade
          wheel-gestures
          :contain-scroll="false"
          :autoplay="{ delay: 3000 }"
          :items="fullTemplates"
          :ui="{
            container: 'py-px',
            viewport: 'px-px'
          }"
        >
          <UPageCard
            :to="item.links?.[0]?.to"
            :icon="item.icon"
            :title="item.title"
            target="_blank"
            variant="subtle"
            class="group rounded-md"
            :ui="{
              container: 'p-4 sm:p-4',
              wrapper: 'flex-row items-center gap-1.5',
              leading: 'mb-0',
              leadingIcon: 'text-highlighted'
            }"
          >
            <UColorModeImage
              :light="`/assets/templates/${item.framework}/${item.title.toLowerCase()}-light.png`"
              :dark="`/assets/templates/${item.framework}/${item.title.toLowerCase()}-dark.png`"
              :alt="`Template ${item.title} screenshot`"
              width="620"
              height="348"
              loading="lazy"
              class="rounded-lg w-full border border-default aspect-video"
            />
          </UPageCard>
        </UCarousel>
      </div>
    </UPageSection>

    <USeparator />

    <IntegrationsSection />

    <USeparator />

    <ModelsSection />

    <USeparator />

    <StatsSection :stats="stats" :stats-data="page.stats" />
  </div>
</template>