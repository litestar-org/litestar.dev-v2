// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui'
  ],
  content: {
    experimental: { nativeSqlite: true },
  },
  ui: {
    colorMode: {
      preference: 'light'
    },
    theme: {
      colors: {
        primary: {
          50: '#fef7e7',
          100: '#fdecc4',
          200: '#fbd686',
          300: '#f9c048',
          400: '#f7a91a',
          500: '#EDB641',
          600: '#c8851a',
          700: '#a36a15',
          800: '#7e4f10',
          900: '#59340b',
          950: '#341f06'
        }
      }
    }
  }
})