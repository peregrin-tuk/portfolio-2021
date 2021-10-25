<template>
        <div class="w-full my-4 flex justify-center items-center gap-2">
            <button-basic v-for="item in slice.items" :key="item.button_label" :text="item.button_label" :link="item.button_link" />
        </div>  
</template>

<script>
import ButtonBasic from '~/components/general/buttons/ButtonBasic.vue'

export default {
    components: {
        ButtonBasic
    },
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