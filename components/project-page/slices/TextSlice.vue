<template>
    <prismic-rich-text class="" :field="slice.primary.text" :htmlSerializer="serializer"/>
</template>

<script>
import articleSerializer from "~/app/prismic/article-serializer";

export default {
    props: {
        slice: {
            type: Object,
            required: true 
        },
    },
    data() {
        return {
            serializer: articleSerializer
        }
    }
}
</script>

<style>

</style>