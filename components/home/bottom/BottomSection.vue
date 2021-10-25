<template>
    <div class="w-full h-auto bg-gradient-bottom flex flex-col justify-start items-center relative">
        <img v-if="isXL" class="mt-1 ml-1.5 transform -translate-x-56" src="~/assets/svg/path-desktop.svg" alt="Path">
        <img v-else-if="isMD" class="mt-1 ml-0.5 transform translate-x-20" src="~/assets/svg/path-tablet.svg" alt="Path">
        <img v-else class="mt-1 transform -translate-x-19" src="~/assets/svg/path-mobile.svg" alt="Path">
        <div class="mt-10 xl:-mt-20 mb-6 lg:mb-10 text-h6 sm:text-h4 text-background text-center
                    xl:self-start xl:relative xl:left-1/2 xl:transform xl:-translate-x-28 xl:text-left">
            <nuxt-img v-if="currentCall.icon.url" class="w-9 h-9 object-contain object-center mx-auto relative bottom-14 xl:bottom-0 xl:top-16 xl:-left-66" :src="currentCall.icon.url" />
            <div class="font-light">
                {{ currentCall.line1 }}
            </div>
            <div class="font-medium">
                {{ currentCall.line2 }}
            </div>
        </div>
        <button-action text="let's talk!" />
        <nuxt-img v-if="content.mountains.url" class="h-40 mt-10 sm:h-auto sm:mt-0 3xl:h-120 w-full object-cover object-top" 
                  :src="content.mountains.url" sizes="xxxxl:100vw xxxl:100vw xxl:100vw xl:100vw lg:100vw md:100vw sm:140vw xs:140vw" fit="cover" />
        <home-footer :socials="footer.socials" :last_updated="last_updated" />
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
    props: {
        content: {
            type: Object,
            required: true
        },
        footer: {
            type: Object,
            required: true
        },
        last_updated: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            currentCall: {},
        }
    },
    created() {
        this.getRandomCall()
        console.log('last_updated', this.last_updated)
    },
    methods: {
        getRandomCall: function() {
            this.currentCall = this.content.calls[Math.floor(Math.random() * this.content.calls.length)]
        }
    }
}

// CHECK refactor currentCall to computed property?
</script>

<style>

</style>