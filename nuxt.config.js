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
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cache: true,
    parallel: true,
    hardSource: true,
  },

  // Prismic configuration
  prismic: {
    endpoint: 'https://valleyhammer.cdn.prismic.io/api/v2',
    modern: true
  },

  // Extension of tailwind configuration (custom fonts)
  tailwindcss: {
    config: {
      theme: {
        extend: {
          screens: {
            '3xl': '1920px',
          },
          colors: {
            background: 'rgba(24, 37, 56, 1)',
            backgroundAccent: 'rgba(54, 74, 104, 1)',
            backgroundBright: 'rgba(247, 250, 254, 1)',
            accent: 'rgba(255, 69, 76, 1)',
            accentSubtle: 'rgba(255, 128, 132, 0.6)',
            accent2: 'rgba(77, 100, 210, 1)',
            textBright: 'rgba(255, 255, 255, 1)',
            textSubtle: 'rgba(114, 128, 150, 0.6)',
          }
        },
        fontFamily: {
          'sans':       ['Ubuntu', ...defaultTheme.fontFamily.sans],
          'serif':      ['"Roboto Slab"', ...defaultTheme.fontFamily.serif],
          'secondary':  ['Alata', ...defaultTheme.fontFamily.sans],
          'mono':       [...defaultTheme.fontFamily.mono]
        },
        fontSize: {
          'xxs':  '.75rem',	    // 12px
	        'xs':   '.8125rem',   // 13px
          'sm':   '.875rem',    // 14px
          'base': '1rem',	      // 16px (only mobile text)
          'md':   '1.125rem',   // 18px
          'lg':   '1.25rem',	  // 20px
          'h5':   '1.5rem',	    // 24px (only mobile call and overlays)
          'h4':   '2rem',	      // 32px
          'h3':   '2.25rem',    // 36px
          'h2':   '2.5rem',	    // 40px
          'h1':   '2.75rem',    // 44px (only project page title)
          'xl':   '6rem',	      // 96px
          'xxl':  '9rem',	      // 144px
        }
      }
    },
    plugins: [
      plugin(function({ addBase, theme }) {
        addBase({
          'strong': { fontWeight: theme('fontWeight.bold') },
        })
      })
    ]
  }
}