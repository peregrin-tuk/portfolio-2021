<template>
    <header class="xs:w-104 font-secondary text-sm text-background text-center mx-auto mb-10">
        <div class="text-textSubtle flex justify-center gap-2">
            <span v-for="tag in tags" :key="tag">#{{ tag }}  </span>
        </div>
        <h2 class="text-h1 font-sans font-bold tracking-wide">{{ title }}</h2>
        <div class="tracking-wide mt-1 mb-4">{{ teaser }}</div>
        <div class="text-textSubtle text-xxs lowercase">
            <div class="flex flex-wrap justify-center gap-2">
                <span v-for="tool in tools" :key="tool">{{ tool }} </span>
                <span>·</span>
                <span>{{ year }}</span>
                <span>·</span>
                <span>{{ type }}</span>
            </div>
            <div class="flex flex-wrap justify-center gap-2">
                <span v-show="collaborators.length != 0">
                    together with 
                    <prismic-link class="underline" v-for="c in collaborators" :key="c.name" :field="c.link">{{ c.name }}</prismic-link>
                </span>
                <span v-show="collaborators.length != 0">·</span>
                <span>{{ readingTime }} min read</span>
            </div>
            <div class="flex flex-wrap justify-center gap-2" v-show="additional_information.length != 0">
                <prismic-rich-text :key="additional_information.text" :field="additional_information" />
            </div>
        </div>
    </header>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        teaser: {
            type: String,
            required: true
        },
        date: {
            type: String,
            required: true
        },      
        type: {
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
        collaborators: {
            type: Array,
            required: false 
        },
        additional_information: {
            type: Array,
            required: false 
        },
        slices: {
            type: Array,
            required: false 
        },
    },
    computed: {
        year: function() {
            return this.date.substring(0,4)
        },
        readingTime: function() {
            const wordsPerMinute = 200;
            const textSlices = this.slices.filter(item => item.slice_type === "text")
            const concatenatedText = textSlices.map(slice => slice.primary.text.map(el => el.text).join(' ')).join()
            const noOfWords = concatenatedText.split(/\s/g).length;
            const minutes = noOfWords / wordsPerMinute;
            return Math.ceil(minutes);
        }
    }
}
</script>

<style>

</style>