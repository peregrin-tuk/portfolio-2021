<template>
    <div class="w-full bg-gradient flex items-start justify-center">
        <about-previous-stops  />
        <about-textbox :whatText="content.what_i_do" :whoText="content.who_i_am" />
    </div>
</template>

<script>
import AboutPreviousStops from './AboutPreviousStops.vue'
import AboutTextbox from './AboutTextbox.vue'


export default {
    components: { AboutPreviousStops, AboutTextbox },
    data() {
        return {
            content: {}
        }
    },
    async fetch() {
        this.content = (await this.$prismic.api.getSingle('about')).data
    },
}
</script>

<style>

</style>