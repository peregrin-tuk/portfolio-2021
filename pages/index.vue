<template>
  <main>
    <header-section :content="header" />
    <recent-projects-section :content="recent_projects" />
    <about-section :content="about" />
    <bottom-section :content="bottom" :footer="footer" :last_updated="last_updated_date" />
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
      const header = (await $prismic.api.getSingle('header')).data
      const recent_projects = (await $prismic.api.getSingle('featured_projects', { fetchLinks : ['project.title', 'project.teaser', 'project.tags', 'project.key_image'] })).data
      const about = (await $prismic.api.getSingle('about')).data
      const bottom = (await $prismic.api.getSingle('bottom')).data
      const footer = (await $prismic.api.getSingle('footer')).data
      const last_updated_date = (await $prismic.api.query(
        $prismic.predicates.at('document.type', 'project'),
        { 
          fetch : 'document.last_publication_date', 
          orderings : '[document.last_publication_date desc]',
          pageSize: 1,
          page: 1
          }
      )).results[0]['last_publication_date']
      return { 
        header: header,
        recent_projects: recent_projects,
        about: about,
        bottom: bottom,
        footer: footer,
        last_updated_date: last_updated_date,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>
