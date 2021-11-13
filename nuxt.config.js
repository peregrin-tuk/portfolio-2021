const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'portfolio-2021',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Valleyhammer Portfolio' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Google Fonts
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Alata&family=Roboto+Slab:wght@300;400;500&family=Ubuntu:wght@300;500;700&display=swap'} 
    ]
  },

  // Router configuration
  router: {
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        let container = await findEl('#scroll-container')
        if ('scrollBehavior' in document.documentElement.style) {
          if (container) return container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
          else return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          if (container) container.scrollTo(0, el.offsetTop)
          else return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/main.scss'
  ],

  styleResources: {
    scss: ['./assets/scss/main.scss']
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/style-resources',
    '@nuxtjs/prismic',
    "@nuxt/image",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // cache: true,
    // parallel: true,
    // hardSource: true,
  },

  image: {
    provider: "prismic",
    prismic: {},
    screens: {
      xs: 410,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      xxxl: 1920,
      xxxxl: 2560,
    },
  },

  // Prismic configuration
  prismic: {
    endpoint: 'https://valleyhammer.cdn.prismic.io/api/v2',
    modern: true,
    preview: false
  },

  // Extension of tailwind configuration
  tailwindcss: {
    configPath: 'tailwind.config.js',
  }
}