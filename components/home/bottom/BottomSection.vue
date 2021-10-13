<template>
    <div class="w-full h-screen bg-gradient-bottom flex flex-col justify-start items-center">
        <img v-if="isXL" class="mt-1 ml-1.5 transform -translate-x-56" src="~/assets/svg/path-desktop.svg" alt="Path">
        <img v-else-if="isSM" class="mt-1 transform -translate-x-19" src="~/assets/svg/path-tablet.svg" alt="Path">
        <img v-else class="mt-1 transform -translate-x-19" src="~/assets/svg/path-mobile.svg" alt="Path">
        <div class="my-10 3xl:mb-14 text-h5 sm:text-h4 text-background text-center
                    xl:self-start xl:relative xl:left-1/2 xl:transform xl:-translate-x-28 xl:text-left">
            <div class="font-light">
                {{ currentCall.line1 }}
            </div>
            <div class="font-medium">
                {{ currentCall.line2 }}
            </div>
        </div>
        <button-action text="let's talk!" />
        <p v-if="$fetchState.pending">DATA PENDING</p>
        <p v-else-if="$fetchState.error">An error occurred :(</p>
    </div>
</template>

<script>
import ContactCall from './ContactCall.vue'
import HomeFooter from './HomeFooter.vue'
import ButtonAction from '../../general/buttons/ButtonAction.vue'
import { breakpointMixin } from '~/mixins/breakpointMixin.js'

export default {
    mixins: [ breakpointMixin ],
    components: { ContactCall, HomeFooter, ButtonAction },
    data() {
        return {
            calls: [],
            currentCall: {},
        }
    },
    methods: {
        getRandomCall: function() {
            this.currentCall = this.calls[Math.floor(Math.random() * this.calls.length)]
        }
    },
    async fetch() {
        this.calls = (await this.$prismic.api.getSingle('contact')).data.calls
        this.getRandomCall()
    },
}
</script>

<style>

</style>