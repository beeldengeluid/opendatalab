<template>
  <Fragment>
    <Heading :title="$t('projects')" :icon="icon" :color="color" />

    <CardGrid :cards="cards" path="project-slug" :color="color" />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import icons from '../config/icons'
import { getLocalePath } from '../util/contentFallback'
import { classColors } from '../config/theme'

export default {
  components: { CardGrid, Fragment, Heading },
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
  data: () => ({ icon: icons.project, color: classColors.project }),
  head() {
    const title = this.$t('projects')
    return {
      title,
    }
  },
}
</script>
