<template>
    <header>
        
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
    }
}
</script>

<style>

</style>