<template>
    <transition name="fade">
        <div v-show="active" class="fixed top-0 z-30 w-screen h-screen flex flex-col justify-center items-center bg-backgroundSubtle cursor-pointer" @click.self="$emit('close')">
            <svg @click="closeModal" class="text-backgroundAccent hover:text-accent stroke-current cursor-pointer my-3 sm:mb-8 sm:-mt-8" width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m1.354.646 28.284 28.285M.646 28.931 28.931.646" vector-effect="non-scaling-stroke" />
            </svg>

            <div v-if="!sent" class="w-full sm:w-10/12 md:w-9/12 xl:w-244 rounded-lg cursor-default">
                <div class="h-20 w-full rounded-t-lg bg-backgroundAccent flex justify-center items-center">
                    <span class="text-textBright text-h4 md:text-h3 tracking-wide">Good Afternoon!</span>
                </div>
                <div class="w-full rounded-b-lg bg-textBright flex justify-center">
                    <div class="w-136 m-8 md:mx-20 tracking-wide text-background text-sm font-secondary">
                        <p>{{ isSM ? content.intro_text_desktop : content.intro_text_mobile }}</p>
                        <form name="contact-form" data-netlify="true" data-netlify-honeypot="bot-field" method="POST" novalidate="true" class="mt-4">
                            <input type="hidden" name="form-name" value="contact-form" />
                            <div class="flex flex-wrap gap-6 my-6">
                                <div class="flex-grow min-w-66">
                                    <label for="name" class="text-textSubtle mb-3">name</label>
                                    <input type="text" id="name" name="name" v-model="name" required class="h-12 w-full p-4 rounded font-serif text-xs text-backgroundAccent font-light bg-backgroundBright outline-none focus:ring-1 ring-backgroundAccent" />
                                </div>
                                
                                <div class="flex-grow min-w-66">
                                    <label for="email" class="text-textSubtle mb-3">email</label>
                                    <input type="email" id="email" name="email" v-model="email" required class="h-12 w-full p-4 rounded font-serif text-xs text-backgroundAccent font-light bg-backgroundBright outline-none focus:ring-1 ring-backgroundAccent" />
                                </div>
                            </div>
                            
                            <label for="email" class="text-textSubtle mb-3">message</label>
                            <textarea id="message" name="message" v-model="message" required class="h-36 w-full p-4 rounded font-serif text-xs text-backgroundAccent font-light bg-backgroundBright outline-none focus:ring-1 ring-backgroundAccent" />

                            <div class="flex flex-col items-center mt-4">
                                <span class="pb-4 text-xxs text-accent lowercase">{{ validationMessage }}</span>
                                <button-modal type="submit" text="send" :filled="!isSM" />
                                <span v-show="content.contact_mail" class="py-6 text-xxs text-textSubtle">alternatively, reach me at <a :href="'mailto:' + content.contact_mail" class="text-backgroundAccent">{{ content.contact_mail }}</a></span>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
            <div v-else class="w-full sm:w-10/12 md:w-9/12 xl:w-244 rounded-lg cursor-default">
                <div class="h-20 w-full rounded-t-lg bg-backgroundAccent flex justify-center items-center">
                    <span class="text-textBright text-h4 md:text-h3 tracking-wide">{{ content.thanks_header }}</span>
                </div>
                <div class="w-full rounded-b-lg p-8 bg-textBright flex flex-col justify-center font-secondary">
                    <div class="h-64 flex flex-col items-center justify-center tracking-wide">
                        <span class="text-textSubtle mb-6">Sent.</span>
                        <p class="text-center">Thanks for your message, {{ name }}!<br /> I will get back to you soon.</p>
                    </div>
                    <div class="flex flex-col items-center my-4">
                        <button-modal @click="closeModal" text="close" :filled="!isSM" />
                        <span v-show="content.contact_mail" class="py-6 text-xxs text-textSubtle">you can still reach me at <a :href="'mailto:' + content.contact_mail" class="text-backgroundAccent">{{ content.contact_mail }}</a></span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { breakpointMixin } from '~/mixins/breakpointMixin.js'
import ButtonModal from '~/components/general/buttons/ButtonModal.vue'

function initialState() {
    return {
            sent: false,
            validationMessage: '',
            name: null,
            email: null,
            message: null,
            errors: false,
        }
}

export default {
    mixins: [breakpointMixin],
    components: {
        ButtonModal
    },
    props: {
        content: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return initialState()
    },
    methods: {
        checkForm(e) {
            this.errors = false
            this.validationMessage = ''

            if (!this.name || !this.email || !this.message) {
                this.errors = true
                this.validationMessage = 'Please fill in all fields'
            } 
            else if (!this.validEmail(this.email)) {
                this.errors = true
                this.validationMessage = 'Please enter a valid email address'
            }

            if (!this.errors) {
                this.sent = true
                return true
            }

            e.preventDefault();
        },
        validEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        closeModal() {
            Object.assign(this.$data, initialState())
            this.$emit('close')
        }
    }

}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>