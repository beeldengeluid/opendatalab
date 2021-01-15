<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="project in projects"
        :key="project.slug"
        :to="
          localePath({ name: 'project-slug', params: { slug: project.slug } })
        "
      >
        <v-list-item-icon>
          <v-icon>mdi-rocket-launch</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="project.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
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

    return { projects }
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
