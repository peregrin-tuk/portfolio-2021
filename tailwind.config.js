const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

export default {
    theme: {
        extend: {
            screens: {
                'xs': '410px',
                '3xl': '1920px',
            },
            spacing: {
                '9.5': '2.375rem',
                '13': '3.25rem',
                '19': '4.75rem',
                '22': '5.5rem',
                '66': '16.5rem',
                '88': '22rem',
                '92': '23rem',
                '104': '26rem',
                '120': '30rem',
                '184': '46rem',
                '192': '48rem',
                '244': '61rem',
                '294': '73.5rem',
            }, 
            maxWidth: {
                '88': '22rem',
            },
            minHeight: {
                '152': '38rem',
            },
            colors: {
                background: 'rgba(24, 37, 56, 1)',
                backgroundSubtle: 'rgba(24, 37, 56, 0.6)',
                backgroundAccent: 'rgba(54, 74, 104, 1)',
                backgroundAccent2: 'rgba(66, 91, 128, 1)',
                backgroundBright: 'rgba(247, 250, 254, 1)',
                accent: 'rgba(255, 69, 76, 1)',
                accentSubtle: 'rgba(255, 128, 132, 0.6)',
                accentSoft: ' rgba(236, 88, 93, 1)',
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
            'xxs':  '.75rem',	  // 12px
            'xs':   '.8125rem',   // 13px
            'sm':   '.875rem',    // 14px
            'base': '1rem',	      // 16px (only mobile text)
            'md':   '1.125rem',   // 18px
            'lg':   '1.25rem',	  // 20px
            'h5':   '1.5rem',	  // 24px (only mobile call and overlays)
            'h4':   '2rem',	      // 32px
            'h3':   '2.25rem',    // 36px
            'h2':   '2.5rem',	  // 40px
            'h1':   '2.75rem',    // 44px (only project page title)
            'xl':   '6rem',	      // 96px
            'xxl':  '9rem',	      // 144px
        }
    },
    variants: {},
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                'strong': { fontWeight: theme('fontWeight.bold') },
            })
        })
    ],
    purge: {
      content: [
        `components/**/*.{vue,js}`,
        `layouts/**/*.vue`,
        `pages/**/*.vue`,
        `plugins/**/*.{js,ts}`,
        `nuxt.config.{js,ts}`
      ]
    }
  }
  