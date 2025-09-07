import { createResolver } from 'nuxt/kit'
import { parseMdc } from './helpers/mdc-parser.mjs'

const { resolve } = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      concurrency: 1,
      crawlLinks: true,
      // routes: ['/'],
      // ignore: ['/plugins/advanced-alchemy'],
    }
  },
  logLevel: 'verbose',  // Add this line
  compatibilityDate: '2025-07-15',
  runtimeConfig: {
    public: {
      githubUrl: 'https://github.com/litestar-org/litestar',
      discordUrl: 'https://discord.gg/litestar',
      pypiUrl: 'https://pypi.org/project/litestar/',
      contributorsUrl: 'https://github.com/litestar-org/litestar/graphs/contributors',
    }
  },
  devtools: { enabled: false },
  modules: [
    '@nuxt/ui',
    '@nuxt/test-utils',
    'nuxt-content-twoslash',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@vueuse/nuxt',
    '@nuxtjs/mdc',
    'nuxt-og-image',
    'motion-v/nuxt',
  ],
  app: {
    baseURL: '/',
    pageTransition: false,
    layoutTransition: false
  },
  css: ['~/assets/css/main.css'],
  content: {
    experimental: { sqliteConnector: 'better-sqlite3' },
    build: {
      markdown: {
        remarkPlugins: {
          // Add remark-gfm
          'remark-gfm': {

          },  
        },
        highlight: {
          theme: {
            default: 'material-theme-lighter',
            dark: 'material-theme-palenight'
          },
          langs: ['sql', 'diff', 'ini', 'python', 'toml','shell']
        }
      }
    },
  },
  mdc: {
    highlight: {
      noApiRoute: false,
      langs: ['js', 'python', 'toml','shell'],
    }
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
    }
  },
  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: resolve('./app/assets/icons')
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    },
    provider: 'iconify'
  },
  twoslash: {
    floatingVueOptions: {
      classMarkdown: 'prose prose-primary dark:prose-invert'
    },
    // Skip Twoslash in dev to improve performance. Turn this on when you want to explicitly test twoslash in dev.
    enableInDev: false,
    // Do not throw when twoslash fails, the typecheck should be down in github.com/nuxt/nuxt's CI
    throws: false
  }

})