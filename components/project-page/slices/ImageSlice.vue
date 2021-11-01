<template>
    <figure class="my-8">
        <nuxt-img 
            class="w-full h-auto bg-textSubtle" 
            :src="slice.primary.image.url" 
            :key="slice.primary.image.url"
            :alt="slice.primary.caption"
            sizes="xs:100vw sm:100vw md:100vw lg:60vw xl:50vw 2xl:50vw 3xl:50vw" 
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