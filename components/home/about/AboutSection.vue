<template>
    <div class="w-full bg-gradient flex items-start justify-center items-center flex-col-reverse xl:flex-row">
        <about-previous-stops :work="content.work" :education="content.education" />
        <about-textbox :whatText="content.what_i_do" :whoText="content.who_i_am" />
    </div>
</template>

<script>
import AboutPreviousStops from './AboutPreviousStops.vue'
import AboutTextbox from './AboutTextbox.vue'


export default {
    components: { AboutPreviousStops, AboutTextbox },
    props: {
        content: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>