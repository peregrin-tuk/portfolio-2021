<template>
    <div class="min-h-screen h-full w-full bg-gradient-reverse">
        <div class="max-w-7xl h-auto pt-12 pb-20 sm:px-0 sm:pt-36 mx-auto">
            <h2 class="w-24 sm:w-auto py-4 pl-16 sm:pl-20 relative z-10 text-textBright text-h3 sm:text-h2">Recent Projects</h2>
            <div class="w-full min-h-152 flex flex-wrap justify-center relative z-10">
                <project-card alignmentClass="self-end"    :tag="recentProjects[0].tag" :title="recentProjects[0].title" :teaser="recentProjects[0].teaser" :image="recentProjects[0].image" />
                <project-card alignmentClass="self-center" :tag="recentProjects[1].tag" :title="recentProjects[1].title" :teaser="recentProjects[1].teaser" :image="recentProjects[1].image" />
                <project-card alignmentClass="self-start"  :tag="recentProjects[2].tag" :title="recentProjects[2].title" :teaser="recentProjects[2].teaser" :image="recentProjects[2].image" />
            </div>
        </div>
    </div>
</template>

<script>
import ProjectCard from '~/components/home/recent/ProjectCard.vue';

export default {
    components: { ProjectCard },
    data() {
        return {
            recentProjects: []
        }
    },
    async fetch() {
        const content = await this.$prismic.api.getSingle('featured_projects', { fetchLinks : ['project.title', 'project.teaser', 'project.tags', 'project.key_image'] })

        for(const p of content.data.projects) {
            this.recentProjects.push({
                'title': p.item.data.title,
                'teaser': p.item.data.teaser,
                'tag': p.item.data.tags[0].tag,
                'image': p.item.data.key_image.card
            })
        }
    },
}
</script>

<style scoped>
h2 {
    text-indent: -1rem;
}
</style>