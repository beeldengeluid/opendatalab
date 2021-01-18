<template>
  <div>
    <article>
      <h1>{{ article.title }}</h1>
      <v-divider class="my-5" />

      <div v-if="article.datasets && article.datasets.length > 0">
        <v-chip
          v-for="dataset of article.datasets"
          :key="dataset.id"
          class="ma-2"
          color="pink"
          label
          link
          :to="
            localePath({
              name: 'dataset-slug',
              params: { slug: dataset.id },
            })
          "
          text-color="white"
        >
          <v-icon left> mdi-database </v-icon>
          {{ dataset.name }}
        </v-chip>
        <v-divider class="my-5" />
      </div>

      <nav>
        <ul>
          <li v-for="link of article.toc" :key="link.id">
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <v-divider class="my-5" />
      <nuxt-content :document="article" />
      <v-divider class="my-5" />
      <p>{{ $t('last_update') }}: {{ formatDate(article.updatedAt) }}</p>

      <prev-next :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script>
import { getLocalePath } from '../../util/contentFallback'
import { formatDate } from '../../util/date'

export default {
  async asyncData({ $content, params, app }) {
    // current project
    const projectPath = await getLocalePath({
      $content,
      app,
      path: `projects/${params.slug}`,
    })
    const project = await $content(projectPath).fetch()

    // prev/next projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: `projects`,
    })

    const [prev, next] = await $content(projectsPath)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    const datasets = await $content('datasets').fetch()
    // populate datasets on project with dataset object
    project.datasets = project.datasets
      .map((datasetId) =>
        datasets.datasets.find((dataset) => dataset.id == datasetId)
      )
      .filter((d) => d)

    return { article: project, prev, next }
  },
  head() {
    const title = this.article.title
    return {
      title,
    }
  },
  methods: {
    formatDate,
  },
}
</script>
