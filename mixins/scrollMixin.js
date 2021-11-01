export const scrollMixin = {
    mounted () {
      this.$el.scrollTop = sessionStorage.getItem('scroll-' + this.$route.path) || 0
    },
    methods: {
      saveScroll (event) {
        sessionStorage.setItem('scroll-' + this.$route.path, event.currentTarget.scrollTop)
      }
    }
  }