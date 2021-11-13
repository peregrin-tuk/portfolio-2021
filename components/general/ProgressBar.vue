<template>
    <div class="h-screen w-2" :class="'bg-' + backgroundColor">
        <div class="w-2 h-0 transition duration-200 scroll-progress" :class="'bg-' + color">
        </div>
    </div>
</template>

<script>
export default {
    props: {
        color: {
            type: String,
            required: true
        },
        backgroundColor: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            scrollContainer: null
        }
    },
    mounted() {
        if (process.client) { 
            this.scrollContainer = this.$el.closest('#scroll-container') || window
            this.scrollContainer.addEventListener('scroll', this.handleScroll)         
        }
    },
    destroyed() {
        if (process.client) {
            this.scrollContainer.removeEventListener('scroll', this.handleScroll)
        }  
    },
    methods: {
        handleScroll (event) {
            let containerScroll, contentHeight

            if (this.scrollContainer == window) {
                containerScroll = document.body.scrollTop || document.documentElement.scrollTop
                contentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            } else {
                containerScroll = this.scrollContainer.scrollTop
                contentHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight
            }
            
            let scrollPercentage = (containerScroll / contentHeight) * 100
            document.querySelector(".scroll-progress").style.height = scrollPercentage + "%"
        }
    }
}
</script>

<style>

</style>