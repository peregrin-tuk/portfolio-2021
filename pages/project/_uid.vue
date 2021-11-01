<template>
  <div class="slideable-page">
    <div class="flex items-stretch flex-col lg:flex-row">

      <!-- Image -->
      <div v-show="isLG" class="flex-none lg:w-1/3 2xl:w-1/2">
        <div class="sticky top-0 bg-background">
          <transition name="fade" mode="out-in">
            <nuxt-img 
              class="h-screen w-full object-cover object-center" 
              :src="key_image.url" 
              :key="key_image.url"
              :alt="key_image.alt"
              sizes="lg:100vw md:100vw sm:100vw" 
              fit="cover" />
          </transition>
          <div class="absolute top-1/2 left-8 flex justify-center items-center w-13 h-13 rounded-full bg-backgroundSubtle">
            <a href="" @click.prevent="from == '/' || from == '/projects' ? $router.back() : $router.push('/projects')">
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.964 14.964 2 2M14.964 2 2 14.964" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Image Mobile -->
      <div v-show="!isLG">
        <nuxt-img 
          class="h-64 w-full object-cover object-center" 
          :src="key_image.url" 
          :key="key_image.url"
          :alt="key_image.alt"
          sizes="3xl:50vw 2xl:50vw" 
          fit="cover" />
        <div class="absolute top-4 left-4 flex justify-center items-center w-13 h-13 rounded-full bg-backgroundSubtle">
          <a href="" @click.prevent="from == '/' || from == '/projects' ? $router.back() : $router.push('/projects')">
            <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.333 9.5H2M9.5 17 2 9.5M9.5 2 2 9.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Progress Bar --->
      <progress-bar v-show="isLG" class="sticky top-0" backgroundColor="backgroundBright" color="backgroundAccent" />
      

      <!-- Project Article -->
      <main class="w-screen h-full min-h-screen flex flex-col justify-between items-center p-8 sm:px-20 md:px-36 md:py-12 lg:w-full lg:p-32 lg:pb-16 3xl:px-52 bg-backgroundBright ">
        <project-header 
          :title="title"
          :teaser="teaser"
          :date="date"
          :type="type"
          :main_tag="main_tag"
          :tags="tags"
          :tools="tools"
          :collaborators="collaborators"
          :additional_information="additional_information"
          :slices="slices"
        />
        <project-article
        class="max-w-xl"
          :slices="slices"
        />
        

        <!-- Footer Links -->
        <nav class="w-full flex justify-between mt-20 font-secondary text-base lg:text-sm text-textSubtle text-center">
          <NuxtLink to="/projects">projects</NuxtLink>
          <NuxtLink to="/">home</NuxtLink>
          <NuxtLink to="/contact">contact</NuxtLink>
        </nav>
      </main>

      <contact-modal :active="showContactModal" @close="closeContactModal" :content="contact" />
    </div>
  </div>
</template>

<script>
import ProgressBar from "~/components/general/ProgressBar.vue"
import ProjectHeader from "~/components/project-page/ProjectHeader.vue"
import ProjectArticle from "~/components/project-page/ProjectArticle.vue"
import ContactModal from '~/components/contact/ContactModal.vue'
import { breakpointMixin } from "~/mixins/breakpointMixin";
import chooseTransition from "~/app/pageTransitions";



export default {
  name: 'project-page',
  components: { ProgressBar, ProjectHeader, ProjectArticle, ContactModal },
  mixins: [ breakpointMixin],
  transition(to, from) {
    return chooseTransition(to, from)
  },
  head () {
    return {
      title: 'Valleyhammer | ' + this.title,
    }
  },
  data() {
    return {
      showContactModal: false,
    }
  },
  computed: {
    from: function() {
      return this.$nuxt.context.from ? this.$nuxt.context.from.path : ''
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
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/contact") {
      this.openContactModal();
    } else {
      next();
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const project = (await $prismic.api.getByUID('project', params.uid)).data
      const contact = (await $prismic.api.getSingle('contact')).data

      return {
        title: project.title,
        teaser: project.teaser,
        date: project.date,
        type: project.type,
        main_tag: project.tags[0].tags,
        tags: project.tags.map(item => item.tag),
        tools: project.tools.map(item => item.tool),
        collaborators: project.collaborators,
        additional_information: project.additional_information,
        key_image: project.key_image,
        slices: project.body,
        contact: contact,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>