<template>
  <main>
    <!-- <slices-block :slices="slices"/> -->
  </main>
</template>

<script>
export default {
  name: 'project-page',
  components: {  },
  head () {
    return {
      title: 'Valleyhammer | Portfolio',
    }
  },
  async asyncData({ $prismic, params, error }) {
    try{
      const project = (await $prismic.api.getByUID('project', params.uid)).data
      return {
        title: project.title,
        teaser: project.teaser,
        date: project.date,
        type: project.type,
        main_tag: project.tags[0].tags,
        tags: project.tags.map(item => item.tag),
        tools: project.tools.map(item => item.tool),
        collaborators: project.collaborators,
        additional_information: project.additional_information,
        slices: project.body
      }
    } catch (e) {
      error({ statusCode: 404, message: 'Content could not be loaded' })
      console.error(e)
    }
  },
}
</script>