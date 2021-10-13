<template>
  <main>
    <header-section :content="header" />
    <recent-projects-section />
    <about-section />
    <bottom-section />
  </main>
</template>

<script>
import HeaderSection from '~/components/home/header/HeaderSection.vue'
import RecentProjectsSection from '~/components/home/recent/RecentProjectsSection.vue'
import AboutSection from '~/components/home/about/AboutSection.vue'
import BottomSection from '~/components/home/bottom/BottomSection.vue'


export default {
  components: { HeaderSection, RecentProjectsSection, AboutSection, BottomSection },
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
