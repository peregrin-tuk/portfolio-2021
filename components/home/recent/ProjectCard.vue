<template>
    <prismic-link :field="doc" class="h-88 sm:h-120 m-5 sm:flex-none" :class="alignmentClass">
        <div class="hover-up max-w-88 h-88 sm:h-120">
            <img class="h-32 sm:h-auto w-full object-cover rounded-t-lg" :src="image.url" :lt="image.alt">
            <div class="h-56 sm:h-64 px-6 flex flex-col items-center justify-evenly text-sm text-background bg-textBright rounded-b-lg">
                <span class="mt-2 font-secondary text-accent">#{{ tag }}</span>
                <span class="text-h3 font-bold">{{ title }}</span>
                <p class="mt-1 text-center font-secondary">{{ teaser }}</p>
                
                <div class="w-full mt-6 mb-3 flex justify-center items-center font-secondary text-textSubtle">
                    <div class="w-1/2 text-right">
                        <span class="p-4 hover-accent-subtle">view project</span>
                    </div>
                    <div class="w-px h-10 bg-accent" />
                    <div class="w-1/2">
                        <NuxtLink :to="'/projects?filter=' + tag" class="p-4 hover-accent-subtle">more {{ tag }}</NuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </prismic-link>
</template>

<script>
export default {
    props: {
        alignmentClass: {
            type: String,
            required: true
        },
        tag: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        teaser: {
            type: String,
            required: true
        },
        image: {
            type: Object,
            required: true
        },
        doc: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

