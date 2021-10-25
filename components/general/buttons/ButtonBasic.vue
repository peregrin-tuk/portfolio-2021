<template>
    <prismic-link :field="link">
        <button class="h-12 sm:h-10 px-6 rounded bg-backgroundAccent hover:bg-backgroundAccent2 
            font-medium text-sm text-textBright uppercase tracking-wide" @click="$emit('click')">
            {{ text }}
        </button>
    </prismic-link>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        link: {
            type: Object,
            required: true
        }
    }
}
</script>

<style>

</style>