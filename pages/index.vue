<template>
  <Tutorial :greeting="greeting" />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Home',
  head () {
    return {
      title: 'Valleyhammer | Portfolio',
    }
  },
  async asyncData({ $prismic, error }) {
    try{
      // Query to get the home page content
      const homepage = (await $prismic.api.getSingle('header')).data
      return {
        greeting: homepage.greeting,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
})
</script>
