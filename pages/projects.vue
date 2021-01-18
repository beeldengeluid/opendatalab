<template>
  <CardGrid :cards="cards" path="project-slug" />
</template>

<script>
import CardGrid from '../components/CardGrid'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { CardGrid },
  async asyncData({ $content, params, app }) {
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: 'projects',
    })
    const projects = await $content(projectsPath)
      .sortBy('createdAt', 'asc')
      .fetch()

    return { cards: projects }
  },
  head() {
    const title = this.$t('projects')
    return {
      title,
    }
  },
}
</script>
