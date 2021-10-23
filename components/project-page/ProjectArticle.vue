<template>
    <article>
        <section v-for="(slice, index) in slices" :key="'slice-' + index">

            <!-- Text -->
            <template v-if="slice.slice_type === 'text'">
                <text-slice :slice="slice"/>
            </template>

            <!-- Image -->
            <template v-else-if="slice.slice_type === 'image'">
                <image-slice :slice="slice"/>
            </template>

            <!-- Embed -->
            <template v-else-if="slice.slice_type === 'embed'">
                <embed-slice :slice="slice"/>
            </template>

            <!-- Buttons -->
            <template v-else-if="slice.slice_type === 'buttons'">
                <button-slice :slice="slice"/>
            </template>

        </section>
    </article>
</template>

<script>
import ButtonSlice from "~/components/project-page/slices/ButtonSlice.vue"
import EmbedSlice from "~/components/project-page/slices/EmbedSlice.vue"
import ImageSlice from "~/components/project-page/slices/ImageSlice.vue"
import TextSlice from "~/components/project-page/slices/TextSlice.vue"


export default {
    components: {
        ButtonSlice,
        EmbedSlice,
        ImageSlice,
        TextSlice,
    },
    props: {
        slices: {
            type: Array,
            required: true 
        },
    }
}
</script>
