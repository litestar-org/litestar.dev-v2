export default defineAppConfig({
  // https://ui.nuxt.com/getting-started/theme#design-system
  ui: {
    // colorMode: {
    //   preference: 'light',
    // },
    colors: {
      primary: 'yellow',
      neutral: 'slate',
    },
    pageHero: {
      slots: {
        container: 'py-10 sm:py-20 lg:py-20',
        title: 'sm:text-5xl',
      },
    },
    prose: {
      img: {
        base: 'w-full',
      },
      codeTree: {
        slots: {
          root: 'bg-default m-0',
          content: '[&>div>pre]:rounded-r-none',
        },
      },
    },
  },
})
