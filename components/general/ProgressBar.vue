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
    created () {
        if (process.client) window.addEventListener('scroll', this.handleScroll);
    },
    destroyed () {
        if (process.client) window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll (event) {
            let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let contentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrollPercentage = (windowScroll / contentHeight) * 100;
            document.querySelector(".scroll-progress").style.height = scrollPercentage + "%";
        }
    }
}
</script>

<style>

</style>