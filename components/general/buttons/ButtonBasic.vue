<template>
    <button class="h-12 sm:h-10 px-6 rounded bg-backgroundAccent hover:bg-backgroundAccent2 
    font-medium text-sm text-textBright uppercase tracking-wide" @click="$emit('click')">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        }
    }
}
</script>

<style>

</style>