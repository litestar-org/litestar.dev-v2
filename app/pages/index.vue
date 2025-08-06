<script lang="ts" setup>
const [{ data: page }, { data: officialModules }, { data: showcase }] = await Promise.all([
  useAsyncData('index', () => queryCollection('index').first()),
  useFetch('https://api.nuxt.com/modules', {
    key: 'official-modules',
    transform: (res: { modules: Module[], stats: Stats }) => res.modules
      .filter(module => module.type === 'official')
      .sort((a, b) => b.stats.stars - a.stats.stars)
  }),
  useAsyncData('showcase', () => queryCollection('showcase').first()),
])

const stats = useStats()

const tabs = computed(() => page.value?.hero.tabs.map(tab => ({
  label: tab.title,
  icon: tab.icon,
  content: tab.content
})))

const officialModulesLitestar = computed(() => [
    {
    name: 'Polyfactory',
    description: ' Simple and powerful factories for mock data generation',
    type: 'official', 
    stats: { stars: 1262, downloads: 65200 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/redis'
  },
  {
    name: 'Advanced Alchemy',
    description: 'A carefully crafted, thoroughly tested, optimized companion library for SQLAlchemy',
    type: 'official',
    stats: { stars: 609, downloads: 89500 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/sqlalchemy'
  },
  {
    name: 'SQLSpec',
    description: 'A Query Mapper for Python',
    type: 'official', 
    stats: { stars: 856, downloads: 65200 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/redis'
  },
  {
    name: 'litestar-granian',
    description: 'Plugin for Granian',
    type: 'official',
    stats: { stars: 729, downloads: 54300 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/jwt'
  },
  {
    name: 'litestar-vite',
    description: 'Plugin for Vite',
    type: 'official',
    stats: { stars: 645, downloads: 78900 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/openapi'
  },
  {
    name: 'litestar-htmx',
    description: 'Plugin for HTMX',
    type: 'official',
    stats: { stars: 423, downloads: 32100 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/prometheus'
  },
  {
    name: 'litestar-asyncpg',
    description: 'Database connection management plugin for asyncpg',
    type: 'official',
    stats: { stars: 381, downloads: 28700 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/structlog'
  },
    {
    name: 'litestar-oracledb',
    description: 'Plugin for Oracle Database',
    type: 'official',
    stats: { stars: 381, downloads: 28700 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/structlog'
  },
  {
    name: 'litestar-piccolo',
    description: 'Plugin for the Piccolo ORM',
    type: 'official',
    stats: { stars: 381, downloads: 28700 },
    icon: 'nuxt.svg',
    to: '/docs/plugins/structlog'
  }
])
</script>

<template>
    <UPageHero
      class="relative"
      orientation="horizontal"
      :ui="{
        root: 'bg-gradient-to-br from-gray-50 to-white',
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
          <UInputCopy value="uv add litestar" label="uv add litestar" size="xl" />
        </div>
      </template>

      <!-- <UPageCard
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
            <LazyMDC :value="item.content" :cache-key="`index-hero-tab-${index}`" hydrate-on-idle />
          </template>
        </UTabs>
      </UPageCard> -->
    </UPageHero>

    <UPageSection
      :title="page?.features.title"
      :description="page?.features.description"
      :ui="{
        title: 'text-center',
        description: 'text-center',
        root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
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
          class="flex flex-col justify-center gap-4 p-4 bg-muted/50 h-full"
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

    <UPageSection
      :ui="{
        root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default'
      }"
    >
      <template #title>
        <LazyMDC :value="page.foundation.title" unwrap="p" cache-key="index-foundation-title" hydrate-never />
      </template>
      <template #description>
        <LazyMDC :value="page.foundation.description" unwrap="p" cache-key="index-foundation-description" hydrate-never />
      </template>

      <div class="grid grid-cols-1 sm:grid-cols-3">
        <template v-for="(item, index) in page?.foundation.items"
          :key="item.title">
          <UPageCard
            :title="item.title"
            :description="item.description"
            :to="item.link.to"
            class="h-full"
            :ui="{
              root: `${item.gradient} ring-0 border border-default ${index === 0 ? 'max-sm:rounded-t-lg max-sm:rounded-b-none sm:rounded-s-lg sm:rounded-e-none sm:border-r-0 max-sm:border-b-0' : index === page?.foundation.items.length - 1 ? 'max-sm:rounded-t-none max-sm:rounded-b-lg sm:rounded-s-none sm:rounded-e-lg sm:border-l-0 max-sm:border-t-0' : 'rounded-none max-sm:border-y-0'}`,
              title: 'text-lg font-semibold'
            }"
          >
            <template #leading>
              <UIcon :name="item.logo" class="size-6" />
            </template>
          </UPageCard>
        </template>
      </div>
    </UPageSection>

    <UPageSection
      :title="page.stats.title"
      :description="page.stats.description"
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
                  {{ formatNumber(stats.monthlyDownloads) }}
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
                  {{ formatNumber(stats.stars) }}
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
                {{ page.stats.community.title }}
              </span>
              <p class="text-muted text-center">
                {{ page.stats.community.description }}
              </p>
              <UButton class="mt-4 w-fit" v-bind="page.stats.cta" />
            </div>
          </UPageCard>
        </div>

      </div>
    </UPageSection>

    <UPageSection
      :description="page.modules.description"
      :links="page.modules.links"
      :ui="{
        root: 'bg-gradient-to-b border-t border-default from-muted dark:from-muted/40 to-default',
        title: 'text-left',
        description: 'text-left',
        links: 'justify-start'
      }"
    >
      <template #title>
        <LazyMDC :value="page.modules.title" unwrap="p" cache-key="index-modules-title" hydrate-never />
      </template>
      <UCarousel
        v-slot="{ item }"
        dots
        wheel-gestures
        arrows
        :items="officialModulesLitestar"
        class="min-w-0"
        :ui="{
          container: 'ms-0 items-stretch',
          item: 'min-w-0 shrink-0 sm:basis-1/3 p-2',
          arrows: 'hidden 2xl:block'
        }"
      >
        <ModuleItem :module="item" :show-badge="false" :is-added="false" class="min-h-full" />
      </UCarousel>
    </UPageSection>

    <IntegrationsSection />

    <ModelsSection />
</template>