import { createResolver } from 'nuxt/kit'
import { parseMdc } from './helpers/mdc-parser.mjs'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  nitro: {
    prerender: {
      // concurrency: 1,
      crawlLinks: true,
      // failOnError: false,
      routes: ['/robots.txt'],
      ignore: [(route) => route.startsWith('/litestar.dev-v2/plugins')],
      autoSubfolderIndex: false,
    },
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
    'nuxt-og-image',
    'motion-v/nuxt',
    '@nuxtjs/google-fonts',
  ],
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

    fonts: ['Inter:400', 'Inter:500', 'Inter:600', 'Inter:700'],
  },
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700],
    },
  },
  app: {
    baseURL: '/litestar.dev-v2/',
    pageTransition: false,
    layoutTransition: false,
  },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: { sqliteConnector: 'better-sqlite3' },
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
          langs: ['sql', 'diff', 'ini', 'python', 'toml', 'shell'],
        },
      },
    },
  },
  mdc: {
    highlight: {
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
