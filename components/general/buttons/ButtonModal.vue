<template>
    <button class="h-13 sm:h-12 w-full sm:w-80 px-6 rounded font-secondary text-sm lowercase" 
    :class="filled ? 'text-textBright bg-backgroundAccent hover:bg-backgroundAccent2' 
                   : 'text-background border-2 border-background hover:text-textBright hover:border-transparent hover:bg-backgroundAccent'" 
    @click="$emit('click')">
        {{ text }}
    </button>
</template>

<script>
export default {
    props: {
        text: {
            type: String,
            required: true
        },
        filled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style>

</style>