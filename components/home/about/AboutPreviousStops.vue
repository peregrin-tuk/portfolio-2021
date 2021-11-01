<template>
    <div class="pt-10 xl:px-20">
        <h3 class="mb-5 text-h3 text-right md:text-left text-textBright">Previous Stops</h3>

        <!--  DESKTOP  -->
        <div v-if="isMD" class="mt-20 metro-desktop bg-no-repeat bg-center bg-contain w-184 h-192 relative"> 

            <!-- Work Container -->
            <div class="w-66 h-72 absolute top-28 left-2 flex flex-col justify-start gap-8">
                <about-stop-item v-for="item in work" :key="item.title" :title="item.title" :from="item.start" :to="item.end" :institution="item.institution" :city="item.city" :country_code="item.country_code" /> 
            </div>

            <div class="w-66 absolute top-104 left-13">
                <about-stop-item-info text1="all the time" title="Numerous side projects" text2="which can be found here" link="/projects" scanted /> 
            </div>

            <!-- Education Container -->
            <div class="w-96 h-96 absolute top-20 left-88 flex flex-col justify-start gap-8">
                <about-stop-item alignLeft line="education" v-for="item in education" :key="item.title" :title="item.title" :from="item.start" :to="item.end" :institution="item.institution" :city="item.city" :country_code="item.country_code" /> 
            </div>
        </div>

        <!--  MOBILE  -->
        <div v-else class="mt-10 metro-mobile bg-no-repeat bg-center bg-contain w-88 max-w-full h-244 relative"> 

            <!-- Work Container -->
            <div class="w-66 h-72 absolute top-12 left-22 flex flex-col justify-start gap-8">
                <about-stop-item v-for="item in work" :key="item.title" :title="item.title" :from="item.start" :to="item.end" :institution="item.institution" :city="item.city" :country_code="item.country_code" /> 
            </div>

            <div class="w-66 absolute top-72 left-22">
                <about-stop-item-info text1="all the time" title="Numerous side projects" text2="which can be found here" link="/projects" /> 
            </div>

            <!-- Education Container -->
            <div class="w-80 xs:w-96 h-96 absolute top-120 left-3 flex flex-col justify-start gap-8">
                <about-stop-item alignLeft line="education" v-for="item in education" :key="item.title" :title="item.title" :from="item.start" :to="item.end" :institution="item.institution" :city="item.city" :country_code="item.country_code" /> 
            </div>
        </div>
    </div>
</template>

<script>
import { breakpointMixin } from '~/mixins/breakpointMixin.js'
import AboutStopItem from './AboutStopItem.vue'
import AboutStopItemInfo from './AboutStopItemInfo.vue'

export default {
    mixins: [breakpointMixin],
    components: { AboutStopItem, AboutStopItemInfo },
    props: {
        work:{
            type: Array,
            required: true,
        },
        education:{
            type: Array,
            required: true,
        }
    },
}
</script>

<style scope>
.metro-desktop {
    background-image: url("~/assets/svg/metro-plan-desktop.svg");
}
.metro-mobile {
    background-image: url("~/assets/svg/metro-plan-mobile.svg");
}
</style>