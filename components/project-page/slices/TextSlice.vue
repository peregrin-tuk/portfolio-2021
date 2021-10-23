<template>
    <prismic-rich-text class="" :field="slice.primary.text"/>
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