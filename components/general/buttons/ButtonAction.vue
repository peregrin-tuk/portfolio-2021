<template>
    <button class="hover-up h-12 w-56 px-6 rounded bg-accent hover:bg-accentSoft 
    font-medium text-lg text-textBright lowercase tracking-wide" @click="$emit('click')">
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