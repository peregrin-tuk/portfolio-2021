<template>
    <main id="scroll-container">
      <contact-modal :active="showContactModal" @close="closeContactModal" :content="contact" />
      <header-section :content="header" />
      <recent-projects-section :content="recent_projects" />
      <about-section :content="about" />
      <bottom-section :content="bottom" :footer="footer" :last_updated="last_updated_date" />
      <!-- <div class="hidden leading-6 text-justify text-h5 capitalize mb-3 text-accentSoft text-accent2">dynamic tailwind classes</div> -->
    </main>
</template>

<script>
import HeaderSection from '~/components/home/header/HeaderSection.vue'
import RecentProjectsSection from '~/components/home/recent/RecentProjectsSection.vue'
import AboutSection from '~/components/home/about/AboutSection.vue'
import BottomSection from '~/components/home/bottom/BottomSection.vue'
import ContactModal from '~/components/contact/ContactModal.vue'
import chooseTransition from "~/app/pageTransitions";

export default {
  components: { HeaderSection, RecentProjectsSection, AboutSection, BottomSection, ContactModal },
  mixins: [ ],
  name: 'Home',
  transition(to, from) {
    return chooseTransition(to, from)
  },
  head () {
    return {
      title: 'Valleyhammer | Portfolio',
    }
  },
  data() {
    return {
      showContactModal: false,
    }
  },
  methods: {
    openContactModal() {
      this.showContactModal = true;
      window.history.pushState({}, null, '/contact')
    },
    closeContactModal() {
      this.showContactModal = false;
      window.history.pushState({}, null, this.$route.path)
    },
    removeHash() {
      window.location.hash = ""
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/contact") {
      this.openContactModal();
    } else {
      next();
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      const header = (await $prismic.api.getSingle('header')).data
      const recent_projects = (await $prismic.api.getSingle('featured_projects', { fetchLinks : ['project.title', 'project.teaser', 'project.tags', 'project.key_image'] })).data
      const about = (await $prismic.api.getSingle('about')).data
      const bottom = (await $prismic.api.getSingle('bottom')).data
      const footer = (await $prismic.api.getSingle('footer')).data
      const contact = (await $prismic.api.getSingle('contact')).data
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
        contact: contact,
        last_updated_date: last_updated_date,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>
