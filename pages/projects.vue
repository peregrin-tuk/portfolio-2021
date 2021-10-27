<template>
  <div>
    <div class="flex items-stretch">
      <!-- Project Overview -->
      <main class="bg-backgroundBright w-screen h-full min-h-screen flex-none p-8 sm:px-20 md:px-36 md:py-12 lg:w-2/3 2xl:w-1/2 lg:px-12 lg:py-0">
        <!--- Logo & Filters --->
        <div class="w-full mb-16 px-4 flex justify-between items-center text-textSubtle text-sm font-secondary lg:sticky lg:top-0 lg:pt-10 lg:pb-4 lg:bg-backgroundBright">
          <div class="w-14">
            <NuxtLink to="/">V</NuxtLink>
          </div>

          <div v-if="isMD">
            <nav class="flex">
              <span v-for="tag in tagFilters" :key="tag" class="hover-accent-subtle mr-4">#{{ tag }}</span>
            </nav>
          </div>
          <div v-else class="px-8" @click="openFilterModal">
            <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" stroke="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.542 4.675c1.683 2.158 4.791 6.158 4.791 6.158v5c0 .459.375.834.834.834h1.666a.836.836 0 0 0 .834-.834v-5s3.1-4 4.783-6.158a.831.831 0 0 0-.658-1.342H4.2a.831.831 0 0 0-.658 1.342Z" />
            </svg>
          </div>

          <div class="w-14">show all</div>
        </div>

        <!-- Project List -->
        <div class="lg:flex lg:flex-col lg:items-center lg:min-h-screen lg:overview-vertical-pos">
          <NuxtLink  v-for="(project, index) in projects" :key="project.uid" :to="'/project/' + project.uid">
            <overview-title-group
              class="mb-16 sm:mb-20 md:mb-32 xl:mb-42 3xl:mb-56 transition duration-300"
              :class="{ 'opacity-20': isLG && index != activeProjectIndex }"
              :title="project.data.title"
              :teaser="project.data.teaser"
              :tags="project.data.tags"
              :tools="project.data.tools"
              :date="project.data.date"
              :image="project.data.key_image"
              :uid="project.uid"
              :data-index="index"
              :observer="scrollObserver"
            />
          </NuxtLink>
        </div>

        <!-- Home Link -->
        <div class="w-20 mt-32 font-secondary text-base lg:text-sm text-textSubtle text-center mx-auto lg:w-full lg:sticky lg:bottom-0 lg:pb-10 lg:pt-4 lg:bg-backgroundBright"><NuxtLink to="/">home</NuxtLink></div>
      </main>

      <!-- Progress Bar --->
      <progress-bar v-show="isLG" class="sticky top-0" backgroundColor="backgroundBright" color="backgroundAccent" />

      <!-- Image -->
      <div v-show="isLG" class="w-full">
        <div class="sticky top-0 bg-background">
          <transition name="fade" mode="out-in">
            <NuxtLink :to="'/project/' + projects[activeProjectIndex].uid">
            <nuxt-img 
              class="h-screen w-full object-cover object-center" 
              :src="projects[activeProjectIndex].data.key_image.url" 
              :key="projects[activeProjectIndex].data.key_image.url"
              :alt="projects[activeProjectIndex].data.key_image.alt"
              sizes="" 
              fit="cover" />
            </NuxtLink>
          </transition>
          <div class="absolute top-1/2 right-8 flex justify-center items-center w-13 h-13 rounded-full bg-backgroundSubtle">
            <svg class="" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 9.5h18.333M12.833 2l7.5 7.5M12.833 17l7.5-7.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>


    <!--- Filters Overlay Mobile --->
    <overview-filters-mobile
      :active="!isLG && showFilterModal"
      @close="closeFilterModal"
      title="filter projects"
      :items="tagFilters"
      :footer="{ name: 'show everything' }"
    />
  </div>
</template>

<script>
import OverviewTitleGroup from "~/components/projects-overview/OverviewTitleGroup.vue";
import OverviewFiltersMobile from "~/components/projects-overview/OverviewFiltersMobile.vue";
import ProgressBar from "~/components/general/ProgressBar.vue"
import { breakpointMixin } from "~/mixins/breakpointMixin";

export default {
  name: "Projects",
  components: { OverviewTitleGroup, OverviewFiltersMobile, ProgressBar },
  mixins: [breakpointMixin],
  head() {
    return {
      title: "Valleyhammer | Portfolio",
    };
  },
  data() {
    return {
      showFilterModal: false,
      scrollObserver: null,
      activeProjectIndex: 0,
    };
  },
  methods: {
    openFilterModal() {
      this.showFilterModal = true;
    },
    closeFilterModal() {
      this.showFilterModal = false;
    },
    onElementObserved(entries) {
      entries.forEach(({ target, isIntersecting}) => {
        if (isIntersecting) {
          const lastTarget = document.querySelector("[data-index='" + this.activeProjectIndex + "']")
          lastTarget.classList.add("opacity-20")
          
          target.classList.remove("opacity-20")
          this.activeProjectIndex = target.getAttribute("data-index")
        }
      });
    }
  },
  created() {
    if (process.client) {
      this.scrollObserver = new IntersectionObserver(
        this.onElementObserved, 
        {
          rootMargin: '-30% 0px',
          threshold: 1.0,
        }
      );
    }
  },
  async asyncData({ $prismic, error }) {
    try {
      const projects = (
        await $prismic.api.query($prismic.predicates.at("document.type", "project"),
          {
            fetch: [
              "project.tags",
              "project.date",
              "project.title",
              "project.teaser",
              "project.tools",
              "project.key_image",
            ],
            orderings: "[my.project.date desc]",
            pageSize: 40,
          }
        )
      ).results;

      const tagFiltersArray = projects.map((el) => el.data.tags.map((el) => el.tag)).flat();
      const tagFilters = Array.from(new Set(tagFiltersArray));

      console.debug('PROJECTs', projects)

      return {
        projects: projects,
        tagFilters: tagFilters
      };
    } catch (e) {
      error({ statusCode: 404, message: "Content could not be loaded" });
      console.error(e);
    }
  },
};
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .15s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>