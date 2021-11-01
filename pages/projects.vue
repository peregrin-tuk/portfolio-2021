<template>
  <div class="slideable-page" @scroll="saveScroll">
    <div>
      <div class="flex items-stretch">
        <!-- Project Overview -->
        <main class="bg-backgroundBright w-screen h-full min-h-screen flex-none p-8 sm:px-20 md:px-36 md:py-12 lg:w-2/3 2xl:w-1/2 lg:px-12 lg:py-0">
          <!--- Logo & Filters --->
          <div class="w-full mb-16 px-4 z-10 flex justify-between items-center text-textSubtle text-sm font-secondary lg:sticky lg:top-0 lg:pt-10 lg:pb-4 lg:bg-backgroundBright">
            <div class="w-14">
              <NuxtLink to="/" class="hover-accent-subtle">
                <svg width="18" height="18" class="fill-current" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#a)">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M.889 2.61h1.875l4.778 6.232 3.021 5.11-1.53 2.652L.889 2.61Zm4.718 0h1.378l3.285 4.38 2.206 3.649-1.53 2.651L8 8.314 5.607 2.61Zm3.703 0h1.663l2.104 2.565 1.313 2.15-1.531 2.652-1.996-3.311L9.31 2.61Zm3.651 0h2.474l.867 1.402-1.53 2.65-1.1-1.845-.71-2.207Zm3.723.74-.48-.74h.908l-.427.74Z"/>
                  </g>
                  <defs>
                      <clipPath id="a">
                      <path fill="#fff" d="M0 0h18v18H0z"/>
                      </clipPath>
                  </defs>
              </svg>
              </NuxtLink>
            </div>

            <div v-if="isMD">
              <nav class="flex">
                <span v-for="tag in tagFilters" :key="tag" @click="toggleFilter(tag)" 
                class="hover-accent-subtle mr-4 cursor-pointer" :class="{ 'text-accent': activeFilters.includes(tag) }">
                  #{{ tag }}
                </span>
              </nav>
            </div>
            <div v-else class="px-8" @click="openFilterModal">
              <svg class="fill-current" width="20" height="20" viewBox="0 0 20 20" stroke="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.542 4.675c1.683 2.158 4.791 6.158 4.791 6.158v5c0 .459.375.834.834.834h1.666a.836.836 0 0 0 .834-.834v-5s3.1-4 4.783-6.158a.831.831 0 0 0-.658-1.342H4.2a.831.831 0 0 0-.658 1.342Z" />
              </svg>
            </div>

            <div class="w-14 cursor-pointer" @click="resetFilters" :class="{ 'invisible': !activeFilters.length }">show all</div>
          </div>

          <!-- Project List -->
          <div class="lg:flex lg:flex-col lg:items-center lg:min-h-screen lg:overview-vertical-pos">
            <NuxtLink  v-for="project in filteredProjects" :key="project.uid" :to="'/project/' + project.uid">
              <overview-title-group
                class="mb-16 sm:mb-20 md:mb-32 xl:mb-42 3xl:mb-56 transition duration-300"
                :class="{ 'opacity-20': isLG && project.dataIndex != activeProjectIndex }"
                :title="project.data.title"
                :teaser="project.data.teaser"
                :tags="project.data.tags"
                :tools="project.data.tools"
                :date="project.data.date"
                :image="project.data.key_image"
                :uid="project.uid"
                :data-index="project.dataIndex"
                :observer="scrollObserver"
              />
            </NuxtLink>
          </div>

          <!-- Home Link -->
          <div class="w-20 mt-32 z-10 font-secondary text-base lg:text-sm text-textSubtle text-center mx-auto lg:w-full lg:sticky lg:bottom-0 lg:pb-10 lg:pt-4 lg:bg-backgroundBright"><NuxtLink to="/">home</NuxtLink></div>
        </main>

        <!-- Progress Bar --->
        <progress-bar v-show="isLG" class="sticky top-0" backgroundColor="backgroundBright" color="backgroundAccent" />

        <!-- Image -->
        <div v-show="isLG" class="w-full">
          <div class="sticky top-0 bg-background">
            <NuxtLink :to="'/project/' + projects[activeProjectIndex].uid">
              <transition name="fade" mode="out-in"> 
                <nuxt-img 
                  class="h-screen w-full object-cover object-center" 
                  :src="projects[activeProjectIndex].data.key_image.url" 
                  :key="projects[activeProjectIndex].data.key_image.url"
                  :alt="projects[activeProjectIndex].data.key_image.alt"
                  sizes="" 
                  fit="cover" />
              </transition>
              <div class="absolute top-1/2 right-8 flex justify-center items-center w-13 h-13 rounded-full bg-backgroundSubtle">
                <svg class="" width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 9.5h18.333M12.833 2l7.5 7.5M12.833 17l7.5-7.5" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>


      <!--- Filters Overlay Mobile --->
      <overview-filters-mobile
        :active="!isMD && showFilterModal"
        @close="closeFilterModal"
        title="filter projects"
        :items="tagFilters"
        :activeItems="activeFilters"
        :footer="{ name: 'show everything', action: 'reset' }"
        @update="toggleFilter"
        @reset="resetFilters"
      />
    </div>
  </div>
</template>

<script>
import OverviewTitleGroup from "~/components/projects-overview/OverviewTitleGroup.vue"
import OverviewFiltersMobile from "~/components/projects-overview/OverviewFiltersMobile.vue"
import ProgressBar from "~/components/general/ProgressBar.vue"
import { breakpointMixin } from "~/mixins/breakpointMixin"
import { scrollMixin } from '~/mixins/scrollMixin'
import chooseTransition from "~/app/pageTransitions"


export default {
  name: "Projects",
  components: { OverviewTitleGroup, OverviewFiltersMobile, ProgressBar },
  mixins: [ breakpointMixin, scrollMixin ],
  transition(to, from) {
    return chooseTransition(to, from)
  },
  head() {
    return {
      title: "Valleyhammer | Portfolio",
    };
  },
  data() {
    return {
      showFilterModal: false,
      scrollObserver: null,
      activeFilters: [],
      activeProjectIndex: 0,
    };
  },
  computed: {
    filteredProjects: function() {
      if (this.activeFilters.length == 0) {
        return this.projects
      }

      const filtered = this.projects.filter(project => {
        let active = false
        project.data.tags.forEach(item => {
          if (this.activeFilters.includes(item.tag)) {
            active =  true
          }
        })
        return active
      })

      return filtered
    }
  },
  methods: {
    toggleFilter(filter) {
      if (this.activeFilters.includes(filter)) {
        // set active project transparent
        if (this.activeFilters.length != 1) {
          document.querySelector("[data-index='" + this.activeProjectIndex + "']").classList.add("opacity-20")
        }

        // remove filter
        const index = this.activeFilters.indexOf(filter)
        this.activeFilters.splice(index, 1)

        // set activeProjectIndex to first of filtered list and update opacity
        if (this.activeFilters.length != 0) {
          this.activeProjectIndex = this.filteredProjects[0].dataIndex
          const target = document.querySelector("[data-index='" + this.activeProjectIndex + "']")
          target.classList.remove("opacity-20")
        }
      } else {
        // set active project transparent
        if (this.activeFilters.length == 0) {
          document.querySelector("[data-index='" + this.activeProjectIndex + "']").classList.add("opacity-20")
        }

        // add filter
        this.activeFilters.push(filter);

        // set activeProjectIndex to first of filtered list and update opacity
        if (this.activeFilters.length == 1) {
          this.activeProjectIndex = this.filteredProjects[0].dataIndex
          const target = document.querySelector("[data-index='" + this.activeProjectIndex + "']")
          target.classList.remove("opacity-20")
        }
      }
    },
    resetFilters() {
      this.activeFilters = [];
    },
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
    // set filters
    if (this.$route.query.filter && this.tagFilters.includes(this.$route.query.filter)) this.activeFilters = [ this.$route.query.filter ]

    // initialize scroll observer
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

      projects.forEach(project => project['dataIndex'] = projects.indexOf(project))

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