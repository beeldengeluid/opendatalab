<template>
  <v-row class="justify-center">
    <v-col class="limit-width py-4">
      <Heading :title="$t('projects')" :icon="icon" :color="color" />
      <v-divider class="my-5" />
      <CardGrid :cards="cards" path="project-slug" :color="color" />
    </v-col>
  </v-row>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import icons from '../config/icons'
import { getLocalePath } from '../util/contentFallback'
import { classColors } from '../config/theme'

export default {
  components: { CardGrid, Heading },
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
