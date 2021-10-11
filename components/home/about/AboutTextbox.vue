<template>
    <div class="px-20 py-10 text-textBright xl:border-l border-textSubtle">
        <div class="xl:mb-20">
            <h3 class="mb-4 text-h3">What I Do</h3>
            <div class="w-88 font-light text-md sm:text-lg space-y-3 sm:space-y-6 tracking-wide" v-html="$prismic.asHtml(whatText)" />
        </div>
        <div>
            <h3 class="mb-4 text-h3">Who I Am</h3>
            <div class="w-88 font-light text-md sm:text-lg space-y-3 sm:space-y-6 tracking-wide" v-html="$prismic.asHtml(whoText)" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        whatText: {
            type: Array,
            required: true
        },
        whoText: {
            type: Array,
            required: true
        },
    },
}
</script>

<style scoped>
</style>