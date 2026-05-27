import { createResolver } from 'nuxt/kit'
import { parseMdc } from './helpers/mdc-parser.mjs'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/robots.txt', '/sitemap.xml'],
    },
    logLevel: 5,
  },
  logLevel: 'verbose',
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      documentationUrl: 'https://docs.litestar.dev/latest/',
      githubUrl: 'https://github.com/litestar-org/litestar',
      discordUrl: 'https://discord.gg/litestar',
      pypiUrl: 'https://pypi.org/project/litestar/',
      sponsorUrl: 'https://github.com/sponsors/litestar-org',
      contributorsUrl:
        'https://github.com/litestar-org/litestar/graphs/contributors',
      issuesUrl: 'https://github.com/litestar-org/litestar/issues/new',
      discussionsUrl: 'https://github.com/litestar-org/litestar/discussions',
      pullRequestsUrl: 'https://github.com/litestar-org/litestar/pulls',
      contributingUrl:
        'https://github.com/litestar-org/litestar/blob/main/CONTRIBUTING.rst',
    },
  },
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils/module',
    'nuxt-content-twoslash',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
    '@nuxt/fonts',
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxtjs/html-validator',
    '@nuxtjs/sitemap',
  ],
  // Dev-time advisory only: surface markup issues without failing the build.
  htmlValidator: {
    failOnError: false,
    options: {
      rules: {
        // Noise from @nuxt/ui component internals (USelectMenu/UInput render
        // <label>/<input>/<div> structures we don't control; UPageCard/UPageHero
        // heading nesting; Shiki injects <style> in code blocks):
        'element-permitted-content': 'off',
        'input-missing-label': 'off',
        'multiple-labeled-controls': 'off',
        'heading-level': 'off',
        'no-dup-class': 'off',
        // Noise from third-party plugin README HTML (GitHub markdown):
        'attribute-allowed-values': 'off',
        'wcag/h63': 'off',
        'no-deprecated-attr': 'off',
        'prefer-native-element': 'off',
        // Soft SEO guideline; our blog titles are descriptive and the
        // " · Litestar Blog" suffix tips them over 70 chars.
        'long-title': 'off',
      },
    },
  },
  sitemap: {
    // Static site: build the sitemap at build time so the @nuxt/content
    // sources (and their draft filter) resolve during `generate` rather
    // than at runtime.
    zeroRuntime: true,
    // Drop the phantom doubled-baseURL home entry: under the
    // /litestar.dev-v2/ subpath the prerender source records the baseURL
    // itself as a route, which the module then re-prefixes. Exclude
    // matches the route path (pre-baseURL), so target the baseURL route.
    exclude: ['/litestar.dev-v2'],
  },
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://litestar-org.github.io',
  },
  $development: {
    site: {
      url: 'http://localhost:3000',
    },
  },
  ogImage: {
    zeroRuntime: true,
  },
  // OG images source their fonts from @nuxt/fonts in v6 (the old
  // `ogImage.fonts` option was removed). `global: true` is required so the
  // @font-face is globally emitted — OG images can't read Tailwind v4 @theme.
  fonts: {
    families: [
      {
        name: 'Inter',
        provider: 'google',
        weights: [400, 500, 600, 700],
        global: true,
      },
    ],
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },
  app: {
    baseURL: '/litestar.dev-v2/',
    // Baked default so every document — including the SPA fallback shells
    // (200.html / 404.html) — has a lang attribute.
    head: {
      htmlAttrs: { lang: 'en' },
    },
    pageTransition: false,
    layoutTransition: false,
  },
  css: ['~/assets/css/main.css'],
  vite: {
    optimizeDeps: {
      // Pre-bundle Vue Flow (used by the architecture diagram) so Vite doesn't
      // discover it at runtime and trigger a dev page reload on first visit.
      include: [
        '@vue-flow/core',
        '@vue-flow/background',
        '@vue-flow/node-toolbar',
      ],
    },
  },
  experimental: {
    extractAsyncDataHandlers: true,
    viteEnvironmentApi: true,
  },
  ui: {
    experimental: {
      componentDetection: true,
    },
  },
  content: {
    build: {
      markdown: {
        remarkPlugins: {
          // Add remark-gfm
          'remark-gfm': {},
        },
        highlight: {
          theme: {
            default: 'material-theme-lighter',
            dark: 'material-theme-palenight',
          },
          langs: [
            'sql',
            'diff',
            'ini',
            'python',
            'toml',
            'shell',
            'js',
            'typescript',
            'vue',
          ],
        },
      },
    },
  },
  hooks: {
    'content:file:afterParse': async ({ file, content }) => {
      if (file.id === 'index/index.yml') {
        // @ts-expect-error -- TODO: fix this
        for (const tab of content.hero.tabs) {
          tab.content = await parseMdc(tab.content)
        }
        // @ts-expect-error -- TODO: fix this
        delete content.meta.body
      }
    },
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: resolve('./app/assets/icons'),
      },
    ],
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
    provider: 'iconify',
  },
  twoslash: {
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert',
    },
    // Skip Twoslash in dev to improve performance. Turn this on when you want to explicitly test twoslash in dev.
    enableInDev: false,
    // Do not throw when twoslash fails, the typecheck should be down in github.com/nuxt/nuxt's CI
    throws: false,
  },
})
