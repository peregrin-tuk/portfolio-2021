<template>
    <div class="hover-up max-w-88 h-88 sm:h-120 sm:flex-none m-5 bg-textBright rounded-lg" :class="alignmentClass">
        <img class="h-32 sm:h-auto w-full object-cover rounded-t-lg " :src="image.url" :lt="image.alt">
        <div class="h-56 sm:h-64 px-6 flex flex-col items-center justify-evenly text-sm text-background">
            <span class="mt-2 font-secondary text-accent">#{{ tag }}</span>
            <span class="text-h3 font-bold">{{ title }}</span>
            <p class="mt-1 text-center font-secondary">{{ teaser }}</p>
            
            <div class="w-full mt-6 mb-3 flex justify-center items-center font-secondary text-textSubtle">
                <div class="w-1/2 text-right">
                    <span class="p-4">view project</span>
                </div>
                <div class="w-px h-10 bg-accent" />
                <div class="w-1/2">
                    <span class="p-4">more interactive</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        alignmentClass: {
            type: String,
            required: false
        },
        tag: {
            type: String,
            required: false
        },
        title: {
            type: String,
            required: false
        },
        teaser: {
            type: String,
            required: false
        },
        image: {
            type: Object,
            required: false
        }
    },
}
</script>

<style>

