<template>
    <transition name="fade">    
        <div v-show="active" class="fixed top-0 z-20 h-screen w-full mx-auto bg-backgroundBright font-secondary text-backgroundAccent flex flex-col items-center">
            <svg @click="$emit('close')" class="mt-9 text-background stroke-current cursor-pointer" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="m1.354.646 28.284 28.285M.646 28.931 28.931.646"/>
            </svg>
            <span class="my-14 text-h6 text-background">{{ title }}</span>

            <nav class="flex-grow flex flex-col justify-evenly items-center text-md">
                <NuxtLink v-for="item in items" :key="item.name" :to="item.link" @click.native="$emit('close')">
                    {{ item.name }}
                </NuxtLink>
            </nav>

            <div class="pb-24">
                <div class="w-16 h-px my-12 bg-textSubtle"></div>
                <NuxtLink :to="footer.link" @click.native="$emit('close')" class="text-md">{{ footer.name }}</NuxtLink>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        footer: {
            type: Object,
            required: true
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