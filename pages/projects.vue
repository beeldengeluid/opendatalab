<template>
  <div>
    <v-row class="justify-center pb-4">
      <v-col class="limit-width">
        <Heading :title="$t('projects')" :icon="icon" :color="color" />
      </v-col>
    </v-row>
    <v-row class="justify-center light-background">
      <v-col class="limit-width py-4">
        <CardGrid :cards="cards" path="project-slug" :data-class="dataClass" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { CardGrid, Heading },
  async asyncData({ $content, app }) {
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
  data: () => ({ dataClass: 'project' }),
  head() {
    const title = this.$t('projects')
    return {
      title,
    }
  },
}
</script>
