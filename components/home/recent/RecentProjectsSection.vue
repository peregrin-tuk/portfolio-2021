<template>
    <div id="recent-projects" class="min-h-screen h-full w-full bg-gradient-reverse">
        <div class="max-w-7xl h-auto pt-12 pb-20 sm:px-0 sm:pt-36 mx-auto">
            <h2 class="w-24 sm:w-auto py-4 pl-16 sm:pl-20 relative z-10 text-textBright text-h3 sm:text-h2">Recent Projects</h2>
            <div class="w-full min-h-152 flex flex-wrap justify-center relative z-10">
                <project-card v-show="typeof projects[0] !== undefined" alignmentClass="self-end"    :tag="projects[0].tag" :title="projects[0].title" :teaser="projects[0].teaser" :image="projects[0].image" :doc="projects[0].doc" />
                <project-card v-show="typeof projects[1] !== undefined" alignmentClass="self-center" :tag="projects[1].tag" :title="projects[1].title" :teaser="projects[1].teaser" :image="projects[1].image" :doc="projects[1].doc" />
                <project-card v-show="typeof projects[2] !== undefined" alignmentClass="self-start"  :tag="projects[2].tag" :title="projects[2].title" :teaser="projects[2].teaser" :image="projects[2].image" :doc="projects[2].doc" />
            </div>
        </div>
    </div>
</template>

<script>
import ProjectCard from '~/components/home/recent/ProjectCard.vue';

export default {
    components: { ProjectCard },
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            projects: [],
        }
    },
    created() {
        this.projects = this.content.projects.map(p => {
                return {
                    'title': p.item.data.title,
                    'teaser': p.item.data.teaser,
                    'tag': p.item.data.tags[0].tag,
                    'image': p.item.data.key_image.card,
                    'doc': p.item
                }
            })
    },
}
</script>

<style scoped>
h2 {
    text-indent: -1rem;
}
</style>