<template>
    <figure class="my-8">
        <nuxt-img 
            class="w-full h-auto" 
            :src="slice.primary.image.url" 
            :key="slice.primary.image.url"
            :alt="slice.primary.caption"
            sizes="" 
            fit="cover" />
        <figcaption class="flex justify-start items-start gap-2 p-3 font-secondary text-textSubtle text-sm lg:text-xs">
            <span class="flex-none">fig {{ slice.primary.number }}</span>
            <span class="flex-none">·</span>
            <span>{{ slice.primary.caption }}</span>
        </figcaption>
    </figure>
</template>

<script>
export default {
    props: {
        slice: {
            type: Object,
            required: true 
        },
    }
}
</script>

<style>

</style>