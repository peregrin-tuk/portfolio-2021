<template>
    <div class="h-screen w-full bg-gradient mx-auto">

        <!--- SVG Background --->
        <div v-if="isMobile">
            <svg class="absolute bottom-0 right-0 transform translate-y-1/2  text-backgroundAccent stroke-current" width="28vh" height="auto" 
                viewBox="0 0 181 587" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M202.241 294.229L159.444 190.432L116.648 294.229L159.444 397.388L202.241 294.229Z" vector-effect="non-scaling-stroke" />
                <path d="M45.4639 294.229L150.539 2L255.613 294.229L150.539 585.5L45.4639 294.229Z" vector-effect="non-scaling-stroke" />
                <path d="M183.57 294.229L92.2283 72.9015L0.886719 294.229L92.2283 515.237L183.57 294.229Z" vector-effect="non-scaling-stroke" />
            </svg>
        </div>
        <div v-else>
            <svg class="absolute bottom-0 transform translate-y-1/2 rhomb text-backgroundAccent stroke-current" width="30vw" height="auto" 
                viewBox="0 0 426 814" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M424.5 407L327 170L229.5 407L327 643L424.5 407Z" vector-effect="non-scaling-stroke" />
                <path d="M349 407L203.5 70.5L58 407L203.5 743L349 407Z" vector-effect="non-scaling-stroke" />
                <path d="M298.5 407L124.5 1.5L-49.5 407L124.5 812L298.5 407Z" vector-effect="non-scaling-stroke" />
            </svg>
            <svg class="absolute bottom-0 right-0 transform translate-y-1/2 text-backgroundAccent stroke-current"  width="30vw" height="auto" 
                viewBox="0 0 442 917" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M359 459L292 296.5L225 459L292 620.5L359 459Z" vector-effect="non-scaling-stroke" />
                <path d="M148 459L312.5 1.5L477 459L312.5 915L148 459Z" vector-effect="non-scaling-stroke" />
                <path d="M287.5 459L144.5 112.5L1.5 459L144.5 805L287.5 459Z" vector-effect="non-scaling-stroke" />
            </svg>
        </div>

        <!--- Logo & Nav --->
        <div class="absolute w-full top-9 px-16 flex justify-between text-backgroundAccent">
            <div>V</div>
            <div class="flex justify-end font-secondary text-sm">
                <span class="hover-accent-1 ml-14">projects</span>
                <span class="hover-accent-1 ml-14">about</span>
                <span class="hover-accent-1 ml-14">contact</span>
            </div>
        </div>
        
        <!--- Hero --->
        <div class="flex h-screen p-12">
            <div class="hero text-textBright m-auto flex items-center flex-wrap">
                <span class="font-bold text-xl sm:text-xxl pr-7 -ml-1.5">{{ $prismic.asText(content.greeting) }}</span>
                <div class="font-light text-md sm:text-lg w-60" v-html="$prismic.asHtml(content.intro_text)"></div>
            </div>
        </div>
        
        <!--- Actions --->
        <div class="actions absolute w-full flex justify-center items-center">
            <div class="p-4 w-72 flex justify-end text-textSubtle hover-bright-4">
                <img src="~/assets/svg/quick-icon.svg" alt="Stopwatch Icon">
                <div class="action-left font-secondary text-sm ml-4 text-right">
                    <prismic-rich-text :field="content.quick_text_desktop" :htmlSerializer="secondarySerializer" />
                </div>
            </div>
            <div class="divider w-px h-24 bg-accent"></div>
            <div class="p-4 w-72 flex justify-start text-textSubtle hover-bright-4">
                <div class="font-secondary text-sm w-48 mr-4">
                    <prismic-rich-text :field="content.book_text_desktop" :htmlSerializer="secondarySerializer" />
                </div>
                <img src="~/assets/svg/book-icon.svg" alt="Telescope Icon">
            </div>
        </div>
    </div>
</template>

<script>
import { isMobileMixin } from '~/mixins/isMobileMixin.js'
import prismicDOM from "prismic-dom";


export default {
    mixins: [isMobileMixin],
    props: {
        content: Object,
        required: true
    },
    methods: {
        secondarySerializer(type, element, content, children) {
            if (type === prismicDOM.RichText.Elements.strong) {
                return '<span class="text-textBright">' + children.join("") + "</span>";
            }
            return null;
        },
    }
}
</script>

<style scoped>
.hero {
    transform: translateY(-5vh);
}
.actions {
    bottom: 6%;
}
.action-left {
    width: 9.5rem;
}
</style>