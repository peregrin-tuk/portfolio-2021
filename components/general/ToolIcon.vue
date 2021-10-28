<template>
  <span :title="name" :class="'toolicon-' + icons[name]" class="text-textSubtle"></span>
</template>

<script>
const iconList = {
    'Angular': 'angular',
    'Firebase': 'firebase',
    'Javascript': 'javascript',
    'Jupyter': 'jupyter',
    'Laravel': 'laravel',
    'Max/MSP': 'max-msp',
    'Node.js': 'node-dot-js',
    'NPM': 'npm',
    'Nuxt.js': 'nuxt-dot-js',
    'Python': 'python',
    'Processing': 'processing',
    'React': 'react',
    'Sass': 'sass',
    'Typescript': 'typescript',                
    'Unity': 'unity',
    'Vue.js': 'vue-dot-js',
    'WebRTC': 'webrtc',
}

export default {
    props: {
        name: {
            type: String,
            required: true,
            validator: function (value) {
                return iconList.hasOwnProperty(value)
            }
        }
    },
    data() {
        return {
            icons: iconList
        }
    }
}
</script>

<style scoped>
@import '~/assets/icon-fonts/icons.css';

</style>