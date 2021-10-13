<template>
  <main>
    <header-section :content="header" />
    <recent-projects-section :content="recent_projects" />
    <about-section :content="about" />
    <bottom-section :content="bottom" />
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
      const recent_projects = (await $prismic.api.getSingle('featured_projects', { fetchLinks : ['project.title', 'project.teaser', 'project.tags', 'project.key_image'] })).data
      const about = (await $prismic.api.getSingle('about')).data
      const bottom = (await $prismic.api.getSingle('contact')).data
      return { 
        header: header,
        recent_projects: recent_projects,
        about: about,
        bottom: bottom,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
    }
  },
}
</script>
