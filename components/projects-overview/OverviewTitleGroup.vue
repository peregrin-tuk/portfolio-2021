<template>
<div>
    <nuxt-img v-show="!isLG" class="h-32 sm:h-36 md:h-44 w-full mb-4 md:mb-8 object-cover object-center" 
              :src="image.mobile_banner.url" :alt="image.alt"
              sizes="sm:576 md:608 lg:736" fit="cover" />
    <div class="lg:w-104 font-secondary text-sm text-background flex">
        <div class="w-6 pt-9 mr-1.5 text-right flex-none">{{ year }}</div>
        <div>
            <div class="text-textSubtle">
                <span v-for="tag in tags" :key="tag.tag">#{{ tag.tag }}  </span>
            </div>
            <h2 class="text-h3 xs:text-h2 font-sans font-bold tracking-wide">{{ title }}</h2>
            <div class="tracking-wide">{{ teaser }}</div>
            <div class="text-textSubtle mt-4 flex flex-start gap-2">
                <ToolIcon v-for="tool in tools" :key="tool.tool" :name="tool.tool" />
            </div>
        </div>
    </div>
</div>
    
</template>

<script>
import { breakpointMixin } from '../../mixins/breakpointMixin'
import ToolIcon from '~/components/general/ToolIcon.vue'

export default {
    mixins: [ breakpointMixin ],
    components: { ToolIcon },
    props: {
        title: {
            type: String,
            required: true
        },
        teaser: {
            type: String,
            required: true
        },
        tags: {
            type: Array,
            required: true
        },
        tools: {
            type: Array,
            required: true
        },
        date: {
            type: String,
            required: true
        },
        image: {
            type: Object,
            required: true
        },
        uid: {
            type: String,
            required: true
        },
        observer: {
            // note: no typecheck due to server side rendering not knowing IntersectionObserver
            required: false
        },
    },
    computed: {
        year() {
            return "'" + this.date.substring(2,4)
        }
    },
    mounted() {
        if (this.observer != null) { 
            this.observer.observe(this.$el)
        }
    }
}
</script>

<style>

