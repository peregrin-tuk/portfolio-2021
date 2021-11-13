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
        },
        scrollContainer: {
            // note: no typecheck due to server side rendering not knowing Element
            required: false
        }
    },
    created () {
        if (process.client) { 
            if (this.scrollContainer !== null) this.scrollContainer.addEventListener('scroll', this.handleScroll)
            else window.addEventListener('scroll', this.handleScroll)            
        }
    },
    destroyed () {
        if (process.client) {
            if (this.scrollContainer) this.scrollContainer.removeEventListener('scroll', this.handleScroll)
            window.removeEventListener('scroll', this.handleScroll)
        }  
    },
    methods: {
        handleScroll (event) {
            let containerScroll, contentHeight

            if (this.scrollContainer) {
                containerScroll = this.scrollContainer.scrollTop
                contentHeight = this.scrollContainer.scrollHeight - this.scrollContainer.clientHeight
            } else {
                containerScroll = document.body.scrollTop || document.documentElement.scrollTop
                contentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            }
            
            let scrollPercentage = (containerScroll / contentHeight) * 100
            document.querySelector(".scroll-progress").style.height = scrollPercentage + "%"
        }
    }
}
</script>

<style>

</style>