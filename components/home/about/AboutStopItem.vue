<template>
    <div class="flex justify-between" :class="{ 'flex-row-reverse gap-5': alignLeft }">
        <div class="text-textBright tracking-wide font-secondary flex flex-col flex-grow">
            <div class="text-textSubtle text-xxs">{{ period }}</div>
            <div class="text-md">{{ title }}</div>
            <div class="flex justify-start items-baseline">
                <img class="w-3 h-2.5 mr-2" :src="require('~/assets/img/flag-' + country_code + '.png')" :alt="country_code + ' Flag'">
                <span class="text-xs">{{ institution }},<br>{{ city }}</span>
            </div>        
        </div>
        <div :class="'text-' + color">
            <svg class="stroke-current mt-7 flex-shrink-0" width="26" height="6" viewBox="0 0 26 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L23 3" stroke-width="6" stroke-linecap="round"/>
            </svg>
        </div>
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
        title: {
            type: String,
            required: true,
        },
        from: {
            type: Number,
            required: true,
        },
        to: {
            type: Number,
            default: null,
        },
        country_code: {
            type: String,
            required: true,
        },
        institution: {
            type: String,
            required: true,
        },
        city:{
            type: String,
            required: true,
        }

    },
    computed: {
        color: function() {
            return this.line == 'education' ? 'accent2' : 'accentSoft'
        },
        period: function() {
            return "'" + this.from.toString().slice(-2) + ( this.to != null ? " - '" + this.to.toString().slice(-2) : "" )
        }
    }
}
</script>

<style>

</style>