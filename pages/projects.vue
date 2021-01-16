<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.slug"
        :cols="card.flex"
        class="mt-2"
      >
        <Card :card="card" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { getLocalePath } from '../util/contentFallback'
import { formatDate } from '../util/date'

export default {
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
  methods: {
    formatDate,
  },
}
</script>
