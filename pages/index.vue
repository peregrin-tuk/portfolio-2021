<template>
  <div>
    <header-section :content="header" />
    <recent-projects-section />
  </div>
</template>

<script>
import HeaderSection from '~/components/home/header/HeaderSection.vue'
import RecentProjectsSection from '~/components/home/recent/RecentProjectsSection.vue'

export default {
  components: { HeaderSection, RecentProjectsSection },
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
