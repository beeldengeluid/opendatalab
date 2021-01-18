<template>
  <Fragment>
    <h1>{{ $t('projects') }}</h1>
    <v-divider class="my-5" />
    <CardGrid :cards="cards" path="project-slug" />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import CardGrid from '../components/CardGrid'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { CardGrid, Fragment },
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
