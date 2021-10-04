<template>
  <header-section :content="header" />
</template>

<script>
import HeaderSection from '~/components/home/header/HeaderSection.vue'

export default {
  components: { HeaderSection },
  name: 'Home',
  head () {
    return {
      title: 'Valleyhammer | Portfolio',
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get the header content
      const header = (await $prismic.api.getSingle('header')).data
      return { header: header }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
    }
  },
}
</script>
