<template>
    <div class="flex justify-between" :class="{ 'flex-row-reverse gap-5': alignLeft }">
        <div class="text-textBright tracking-wide font-secondary flex flex-col flex-grow">
            <div class="text-textSubtle text-xxs" :class=" { '-ml-4': scanted }">{{ text1 }}</div>
            <div class="text-md">{{ title }}</div>
            <div class="text-xs" :class="scanted ? 'ml-4' : 'ml-5'">{{ text2 }}</div>        
        </div>
        <svg :class="'text-' + color +' stroke-current mt-7 flex-shrink-0'" width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L23 3" stroke-width="6" stroke-linecap="round"/>
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        alignLeft: {
            type: Boolean,
            default: false,
        },
        line: {
            type: String,
            default:  'work'
        },
        text1: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        text2: {
            type: String,
            required: true,
        },
        scanted: {
            type: Boolean,
            default: false,
        }
    },
    computed: {
        color: function() {
            return this.line == 'education' ? 'accent2' : 'accentSoft'
        }
    }
}
</script>

<style>

</style>