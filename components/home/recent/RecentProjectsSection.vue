<template>
    <div class="min-h-screen w-full bg-gradient-reverse">
        <div class="w-full flex justify-center relative z-10">
            <project-card />
            <project-card />
            <project-card />
        </div>      
    </div>
</template>

<script>
import ProjectCard from '~/components/home/recent/ProjectCard.vue';

export default {
    components: { ProjectCard },
}
</script>

<style>

</style>