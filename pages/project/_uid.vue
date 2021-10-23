<template>
  <div class="flex items-stretch">

      <!-- Image -->
      <div v-show="isLG" class="flex-none lg:w-1/3 2xl:w-1/2">
        <div class="sticky top-0 bg-background">
          <transition name="fade" mode="out-in">
            <nuxt-img 
              class="h-screen w-full object-cover object-center" 
              :src="key_image.url" 
              :key="key_image.url"
              :alt="key_image.alt"
              sizes="" 
              fit="cover" />
          </transition>
          <div class="absolute top-1/2 left-8 flex justify-center items-center w-13 h-13 rounded-full bg-backgroundSubtle">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.964 14.964 2 2M14.964 2 2 14.964" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

       <!-- Progress Bar --->
      <progress-bar v-show="isLG" class="sticky top-0" backgroundColor="backgroundBright" color="backgroundAccent" />

      <!-- Project Article -->
      <main class="w-screen h-full min-h-screen flex flex-col justify-between p-8 sm:px-20 md:px-36 md:py-12 lg:w-full lg:p-12 bg-backgroundBright ">
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
        />
        <project-article
          :slices="slices"
        />
        

        <!-- Footer Links -->
        <nav class="w-full flex justify-between mt-20 font-secondary text-base lg:text-sm text-textSubtle text-center">
          <span>projects</span>
          <span>home</span>
          <span>contact</span>
        </nav>
      </main>
    </div>
</template>

<script>
import ProgressBar from "~/components/general/ProgressBar.vue"
import ProjectHeader from "~/components/project-page/ProjectHeader.vue"
import ProjectArticle from "~/components/project-page/ProjectArticle.vue"
import { breakpointMixin } from "~/mixins/breakpointMixin";

export default {
  name: 'project-page',
  components: { ProgressBar, ProjectHeader, ProjectArticle },
  mixins: [breakpointMixin],
  head () {
    return {
      title: 'Valleyhammer | Portfolio',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const project = (await $prismic.api.getByUID('project', params.uid)).data
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
        slices: project.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>