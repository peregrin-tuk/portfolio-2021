<template>
    <figure class="my-8">
        <prismic-embed 
            class="embed-container relative w-full h-0 pb-2/3 mx-auto"
            width="100%"
            height="auto"
            :field="slice.primary.embed" />
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
.embed-container {
    padding-bottom: 56.35%;
}

iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>