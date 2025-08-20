<script setup lang="ts">

definePageMeta({
  heroBackground: 'opacity-70 -z-10'
})

const title = 'Litestar Starter & Templates'
const description = 'Kickstart your Litestar project with pre-built templates featuring common patterns, integrations, and best practices.'
const links = [
  {
    icon: 'i-lucide-github',
    label: 'Browse Templates',
    to: 'https://github.com/litestar-org/litestar-templates',
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
  title: 'Litestar Templates',
  description
})

// Templates data
const page = {
  templates: [
    {
      title: 'Litestar Fullstack',
      description: "A complete fullstack web application template built with Litestar backend and modern frontend frameworks. Includes user authentication, database integration, and responsive design patterns.",
      icon: 'i-lucide-user',
      thumbnail: {
        dark: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=dark',
        light: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=light'
      },
      features: [
        { title: 'Built with React but can be Vue, Svelte', icon: 'i-lucide-layout-list' },
        { title: 'Easily editable content via Markdown & YAML', icon: 'i-simple-icons-markdown' },
        { title: 'Fully responsive design', icon: 'i-lucide-smartphone' }
      ],
      links: [
        { label: 'Preview', to: '#', target: '_blank', leadingIcon: 'i-custom-litestar', trailingIcon: 'i-lucide-arrow-up-right', color: 'neutral' },
        { label: 'Litestar Template', to: '#', target: '_blank', icon: 'i-simple-icons-github', color: 'neutral', variant: 'outline' }
      ]
    },
    {
      title: 'Litestar MCP',
      description: "An AI-powered application template using Model Context Protocol to integrate Large Language Models with your Litestar API. Build intelligent, context-aware applications with ease.",
      icon: 'i-lucide-message-circle',
      thumbnail: {
        dark: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2NoYXQtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3NDI4NDY2ODB9.n4YCsoNz8xatox7UMoYZFNo7iS1mC_DT0h0A9cKRoTw.jpg?theme=dark',
        light: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2NoYXQtdGVtcGxhdGUubnV4dC5kZXYiLCJpYXQiOjE3NDI4NDY2ODB9.n4YCsoNz8xatox7UMoYZFNo7iS1mC_DT0h0A9cKRoTw.jpg?theme=light'
      },
      features: [
        { title: 'Powered by Vercel AI SDK', icon: 'i-simple-icons-vercel' },
        { title: 'GitHub OAuth authentication', icon: 'i-lucide-lock' },
        { title: 'Saved chats and messages', icon: 'i-lucide-database' }
      ],
      links: [
        { label: 'Preview', to: '#', target: '_blank', leadingIcon: 'i-custom-litestar', trailingIcon: 'i-lucide-arrow-up-right', color: 'neutral' },
        { label: 'Litestar Template', to: '#', target: '_blank', icon: 'i-simple-icons-github', color: 'neutral', variant: 'outline' }
      ]
    },
    {
      title: 'Litestar SQLStack',
      description: "A comprehensive database-driven application template featuring Litestar with SQLSpec for type-safe database operations, migrations, and an admin dashboard for data management.",
      icon: 'i-lucide-bar-chart-big',
      thumbnail: {
        dark: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2Rhc2hib2FyZC10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTczOTQ2MzU2N30._VElt4uvLjvAMdnTLytCInOajMElzWDKbmvOaMZhZUI.jpg?theme=dark',
        light: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL2Rhc2hib2FyZC10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTczOTQ2MzU2N30._VElt4uvLjvAMdnTLytCInOajMElzWDKbmvOaMZhZUI.jpg?theme=light'
      },
      features: [
        { title: 'Mix with SaaS template for a complete solution', icon: 'i-lucide-puzzle' },
        { title: 'Includes custom components for charts, date pickers, etc.', icon: 'i-lucide-bar-chart-big' },
        { title: 'Resizable multi-column layout', icon: 'i-lucide-columns-3' }
      ],
      links: [
        { label: 'Preview', to: '#', target: '_blank', leadingIcon: 'i-custom-litestar', trailingIcon: 'i-lucide-arrow-up-right', color: 'neutral' },
        { label: 'Litestar Template', to: '#', target: '_blank', icon: 'i-simple-icons-github', color: 'neutral', variant: 'outline' }
      ]
    },
    {
      title: 'Litestar Inertia',
      description: "A modern fullstack template using Inertia.js to seamlessly connect your Litestar backend with frontend frameworks, providing SPA-like experience without API complexity.",
      icon: 'i-lucide-layers-3',
      thumbnail: {
        dark: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=dark',
        light: 'https://assets.hub.nuxt.com/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3BvcnRmb2xpby10ZW1wbGF0ZS5udXh0LmRldiIsImlhdCI6MTc0NTkzNDczMX0.XDWnQoyVy3XVtKQD6PLQ8RFUwr4yr1QnVwPxRrjCrro.jpg?theme=light'
      },
      features: [
        { title: 'Inertia.js integration for seamless frontend-backend communication', icon: 'i-custom-inertia' },
        { title: 'SSR with client-side navigation', icon: 'i-lucide-navigation' },
        { title: 'Built with Vue, also works with React or Svelte', icon: 'i-logos-vue' }
      ],
      links: [
        { label: 'Preview', to: '#', target: '_blank', leadingIcon: 'i-custom-litestar', trailingIcon: 'i-lucide-arrow-up-right', color: 'neutral' },
        { label: 'Litestar Template', to: '#', target: '_blank', icon: 'i-simple-icons-github', color: 'neutral', variant: 'outline' }
      ]
    }
  ]
}

// Template data organized by categories
const starterTemplates = [
  {
    title: 'Litestar',
    description: 'Starter for an API with OpenAPI documentation, validation and CRUD operations.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/basic-api',
    logoIcon: 'i-lucide-leaf',
    featured: true,
    template: 'api'
  },
  {
    title: 'Minimal Litestar',
    description: 'Starter for a minimal API.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/hello-world',
    logoIcon: 'i-lucide-globe',
    template: 'minimal'
  },
  {
    title: 'Plugin',
    description: 'Starter for a plugin.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/cli-app',
    logoIcon: 'i-lucide-terminal',
    template: 'plugin'
  },
  {
    title: 'Middleware',
    description: 'Starter for a middleware.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/middleware',
    logoIcon: 'i-lucide-layers',
    template: 'middleware'
  },
  {
    title: 'Advanced-Alchemy (SQLAlchemy + Alembic)',
    description: 'Starter with ORM, database migration and services for a Rest API',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/sqlalchemy-template',
    logoIcon: 'i-lucide-database',
    featured: true,
    template: 'advanced-alchemy'
  },
  {
    title: 'JWT Authentication',
    description: 'Complete authentication system with JWT tokens, user management, and protected routes.',
    path: 'https://github.com/litestar-org/litestar-templates/tree/main/jwt-auth',
    logoIcon: 'i-lucide-shield-check',
    template: 'jwt-auth'
  }
]

</script>

<template>
  <UContainer>
    <UPageHero
      :title="title"
      :description="description"
      :links="links"
    >
    </UPageHero>

    <!-- <UPage>
      <UPageBody> -->
        <!-- Starter Templates Section -->
    <UPageSection
      title="Starter Templates"
      description="Perfect for learning Litestar fundamentals or building simple applications quickly."
      :ui="{
        title: 'text-left !text-3xl',
        description: 'text-left',
      }"
    >
    <UPageGrid>
        <TemplateCard
          v-for="(template, index) in starterTemplates"
          :key="`starter-${index}`"
          :template="template"
        />
      </UPageGrid>
    </UPageSection>

      <!-- </UPageBody>
    </UPage> -->

    <UPageSection
      title="Templates"
      description="Complete application templates with databases, authentication, and advanced features."
      :ui="{
        title: 'text-left !text-3xl',
        description: 'text-left',
      }"
    >

    <!-- Dynamic Templates from Content Collection -->
    <UPageSection
      v-for="(template, index) in page.templates"
      :key="index"
      :title="template.title"
      :description="template.description"
      :links="template.links"
      :features="template.features"
      orientation="horizontal"
      class="lg:border-t border-default"
      :ui="{
        title: 'lg:text-4xl',
        wrapper: 'lg:py-16 lg:border-r border-default order-last lg:pr-16',
        container: 'lg:py-0',
        links: 'gap-x-3'
      }"
    >
      <template v-if="template.icons" #title>
        <div class="flex items-center gap-3">
          <span class="lg:text-4xl font-bold">{{ template.title }}</span>
          <div class="flex items-center gap-2">
            <UIcon v-for="iconName in template.icons" :key="iconName" :name="iconName" class="size-8 text-primary" />
          </div>
        </div>
      </template>

      <template #description>
        <MDC :value="template.description" unwrap="p" :cache-key="`templates-${index}-description`" />
      </template>

      <div class="lg:border-x border-default h-full flex items-center lg:bg-muted/20">
        <Motion class="flex-1" :initial="{ opacity: 0, transform: 'translateY(10px)' }" :while-in-view="{ opacity: 1, transform: 'translateY(0px)' }" :in-view-options="{ once: true }" :transition="{ duration: 0.5, delay: 0.2 }">
          <UColorModeImage
            v-if="template.thumbnail"
            v-bind="template.thumbnail"
            class="w-full h-auto border lg:border-y lg:border-x-0 border-default rounded-sm lg:rounded-none"
            :alt="`Template ${index} thumbnail`"
            width="656"
            height="369"
            loading="lazy"
          />
          <UCarousel
            v-else-if="template.images"
            v-slot="{ item }"
            :items="(template.images as any[])"
            dots
          >
            <NuxtImg v-bind="item" class="w-full h-full object-cover" width="576" height="360" loading="lazy" />
          </UCarousel>
          <Placeholder v-else class="w-full h-full aspect-video" />
        </Motion>
      </div>
    </UPageSection>
    </UPageSection>
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