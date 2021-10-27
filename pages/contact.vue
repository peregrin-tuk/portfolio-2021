<template>
  <main class="w-screen h-screen bg-gradient">
    <contact-modal @close="goToHome" :content="contact" :active="true" />
  </main>
</template>

<script>
import ContactModal from '~/components/contact/ContactModal.vue'

export default {
  components: { ContactModal },
  name: 'Contact',
  head () {
    return {
      title: 'Valleyhammer | Contact',
    }
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/' })
    },
  },
  async asyncData({ $prismic, error }) {
    try{
      const contact = (await $prismic.api.getSingle('contact')).data
      return { 
        contact: contact,
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>
