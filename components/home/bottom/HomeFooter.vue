<template>
  <footer class="w-full h-12 sm:h-16 px-8 bg-background text-textSubtle text-xxs flex justify-between items-center">
    <div class="flex gap-4">
        <a v-for="item in socials" :key="item.link.url" :href="item.link.url" :title="item.title" target="blank">
          <nuxt-img class="w-4 h-4 object-contain object-center" :src="item.icon.url" />
        </a>
    </div>
    <span>
      Last updated:  {{ formated_last_updated }}
    </span>
  </footer>
</template>

<script>
export default {
  props: {
    last_updated: {
      type: String,
      required: true
    },
    socials: {
      type: Array,
      required: false
    }
  },
  computed: {
    formated_last_updated: function() {
      const date = new Date(this.last_updated)
      console.debug('socials', this.socials)
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric'})
    }
  }
}
</script>

<style>

</style>