// NOTE: this mixin fixes a bug of the current vue-router version (https://github.com/nuxt/nuxt.js/issues/5359)
// once the bug is resolved and router links with hashes scroll to the anchor also the second time they are clicked, this mixin can be removed

export const anchorLinkMixin = {
    methods: {
      scrollToAnchor: async(anchor) => {

        const findEl = async (hash, x) => {
          return document.querySelector(hash) ||
            new Promise((resolve, reject) => {
              if (x > 50) {
                return resolve()
              }
              setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
            })
        }
  
        let el = await findEl(anchor)
        let container = await findEl('#scroll-container')
        if ('scrollBehavior' in document.documentElement.style) {
          if (container) return container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
          else return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          if (container) container.scrollTo(0, el.offsetTop)
          else return window.scrollTo(0, el.offsetTop)
        }
      }
    }
  }