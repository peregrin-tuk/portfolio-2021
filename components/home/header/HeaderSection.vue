<template>
    <div class="h-screen w-full bg-gradient mx-auto">

        <!--- SVG Background --->
        <div v-if="isSM">
            <svg class="absolute bottom-0 transform translate-y-1/2 rhomb text-backgroundAccent stroke-current" width="30vw" 
                viewBox="0 0 426 814" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M424.5 407L327 170L229.5 407L327 643L424.5 407Z" vector-effect="non-scaling-stroke" />
                <path d="M349 407L203.5 70.5L58 407L203.5 743L349 407Z" vector-effect="non-scaling-stroke" />
                <path d="M298.5 407L124.5 1.5L-49.5 407L124.5 812L298.5 407Z" vector-effect="non-scaling-stroke" />
            </svg>
            <svg class="absolute bottom-0 right-0 transform translate-y-1/2 text-backgroundAccent stroke-current"  width="30vw" 
                viewBox="0 0 442 917" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M359 459L292 296.5L225 459L292 620.5L359 459Z" vector-effect="non-scaling-stroke" />
                <path d="M148 459L312.5 1.5L477 459L312.5 915L148 459Z" vector-effect="non-scaling-stroke" />
                <path d="M287.5 459L144.5 112.5L1.5 459L144.5 805L287.5 459Z" vector-effect="non-scaling-stroke" />
            </svg>
        </div>
        <div v-else>
            <svg class="absolute bottom-0 right-0 transform translate-y-1/2 text-backgroundAccent stroke-current" width="28vh" 
                viewBox="0 0 181 587" fill="none" xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M202.241 294.229L159.444 190.432L116.648 294.229L159.444 397.388L202.241 294.229Z" vector-effect="non-scaling-stroke" />
                <path d="M45.4639 294.229L150.539 2L255.613 294.229L150.539 585.5L45.4639 294.229Z" vector-effect="non-scaling-stroke" />
                <path d="M183.57 294.229L92.2283 72.9015L0.886719 294.229L92.2283 515.237L183.57 294.229Z" vector-effect="non-scaling-stroke" />
            </svg>
        </div>

        <!--- Logo & Nav --->
        <div class="absolute w-full top-9 px-12 sm:px-16 flex justify-between text-backgroundAccent">
            <svg width="18" height="18" class="fill-current" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#a)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M.889 2.61h1.875l4.778 6.232 3.021 5.11-1.53 2.652L.889 2.61Zm4.718 0h1.378l3.285 4.38 2.206 3.649-1.53 2.651L8 8.314 5.607 2.61Zm3.703 0h1.663l2.104 2.565 1.313 2.15-1.531 2.652-1.996-3.311L9.31 2.61Zm3.651 0h2.474l.867 1.402-1.53 2.65-1.1-1.845-.71-2.207Zm3.723.74-.48-.74h.908l-.427.74Z"/>
                </g>
                <defs>
                    <clipPath id="a">
                    <path fill="#fff" d="M0 0h18v18H0z"/>
                    </clipPath>
                </defs>
            </svg>
            
            <div v-if="isSM">
                <nav class="flex justify-end font-secondary text-sm">
                    <NuxtLink v-for="item in desktopNavContent" :key="item.name" :to="item.link" @click.native="item.link.startsWith('#') && scrollToAnchor(item.link)" class="hover-accent-subtle ml-14">{{ item.name }}</NuxtLink>
                </nav>
            </div>
            <div v-else>
                <svg @click="openNavigation" class="stroke-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.336 12h17.712M3.336 6h17.712M3.336 18h17.712" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
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
        <div v-if="isSM">
            <div class="actions absolute w-full flex justify-center items-center">
                <NuxtLink to="#recent-projects" @click.native="scrollToAnchor('#recent-projects')" class="p-4 pb-0 w-72 flex justify-end text-textSubtle hover-bright-up">
                    <img class="w-9" src="~/assets/svg/quick-icon.svg" alt="Stopwatch Icon">
                    <div class="action-left font-secondary text-sm ml-4 text-right">
                        <prismic-rich-text :field="content.quick_text_desktop" :htmlSerializer="secondarySerializer" />
                    </div>
                </NuxtLink>
                <div class="w-px h-24 bg-accent"></div>
                <NuxtLink to="/projects"  class="p-4 w-72 flex justify-start text-textSubtle hover-bright-up">
                    <div class="font-secondary text-sm w-48 mr-4">
                        <prismic-rich-text :field="content.book_text_desktop" :htmlSerializer="secondarySerializer" />
                    </div>
                    <img class="w-9" src="~/assets/svg/book-icon.svg" alt="Telescope Icon">
                </NuxtLink>
            </div>
        </div>
        <div v-else>
            <div class="absolute bottom-12 mx-12 border-l border-accent flex flex-col font-secondary text-textSubtle text-sm">
                <NuxtLink to="#recent-projects" class="p-4 pb-0 flex items-center">
                    <img width="26" height="26" src="~/assets/svg/quick-icon.svg" alt="Stopwatch Icon">
                    <span class="ml-4">{{ content.quick_text_mobile }}</span>
                </NuxtLink>
                <NuxtLink to="/projects" class="p-4 flex items-center">
                    <img width="26" height="26" src="~/assets/svg/book-icon.svg" alt="Telescope Icon">
                    <span class="ml-4">{{ content.book_text_mobile }}</span>
                </NuxtLink>
            </div>
        </div>

        <!--- Mobile Nav Overlay -->
        <navigation-mobile :active="!isSM && showNav" @close="closeNavigation" 
            :title="mobileNavContent.title" :items="mobileNavContent.items" :footer="mobileNavContent.footer" />
    </div>
</template>

<script>
import NavigationMobile from './NavigationMobile.vue'
import { breakpointMixin } from '~/mixins/breakpointMixin.js'
import { anchorLinkMixin } from '~/mixins/anchorLinkMixin.js'
import prismicDOM from "prismic-dom";


export default {
    mixins: [breakpointMixin, anchorLinkMixin],
    components: { NavigationMobile },
    props: {
        content: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            showNav: false,
            mobileNavContent: {
                title: 'VALLEYHAMMER.AT',
                items: [
                    { 
                        name: 'home',
                        link: '/'
                    },
                    { 
                        name: 'recent projects',
                        link: '#recent-projects'
                    },
                    { 
                        name: 'about me',
                        link: '#about'

                    },
                    { 
                        name: '',
                        link: ''
                    },
                    { 
                        name: 'all projects',
                        link: '/projects'
                    }
                ],
                footer: 
                    { 
                        name: 'contact',
                        link: '/contact'
                    }
            },
            desktopNavContent: [
                { 
                    name: 'projects',
                    link: '#recent-projects'
                },
                { 
                    name: 'about',
                    link: '#about'

                },
                { 
                    name: 'contact',
                    link: '/contact'

                },
            ]
        }
    },
    methods: {
        openNavigation() {
            this.showNav = true
        },
        closeNavigation() {
            this.showNav = false
        },
        secondarySerializer(type, element, content, children) {
            if (type === prismicDOM.RichText.Elements.strong) {
                return '<span class="text-textBright">' + children.join("") + "</span>"
            }
            return null
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