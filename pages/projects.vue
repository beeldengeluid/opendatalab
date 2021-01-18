<template>
  <v-container fluid>
    <h1>{{ $t('projects') }}</h1>
    <v-divider class="my-5" />
    <CardGrid :cards="cards" path="project-slug" />
  </v-container>
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
