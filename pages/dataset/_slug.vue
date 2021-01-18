<template>
  <Fragment v-if="dataset">
    <v-breadcrumbs :items="createBreadCrumbs()" />
    <article>
      <h1>{{ dataset.title }}</h1>
      <v-divider class="my-5" />

      <p>{{ dataset.description }}</p>
      <h4>{{ $t('records') }}: {{ dataset.records }}</h4>

      <v-divider class="my-5" />

      <!-- projects -->
      <div v-if="projects.length">
        <ChipList
          :chips="projects"
          color="secondary"
          path="project-slug"
          :icon="icons.project"
        />
        <v-divider class="my-5" />
      </div>

      <!-- blogs -->
      <div v-if="blogs.length">
        <ChipList
          :chips="blogs"
          color="tertiary"
          path="blog-slug"
          :icon="icons.blog"
        />

        <v-divider class="my-5" />
      </div>

      <!-- related datasets -->
      <div v-if="relatedDatasets.length">
        <ChipList
          :chips="relatedDatasets"
          color="primary"
          path="dataset-slug"
          :icon="icons.dataset"
        />

        <v-divider class="my-5" />
      </div>
    </article>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { getLocalePath } from '../../util/contentFallback'
import icons from '../../util/icons'

export default {
  components: { Fragment },

  async asyncData({ $content, app, params }) {
    // datasets are not localized (yet)
    const datasets = await $content('datasets').fetch()
    const dataset = datasets.datasets.find(
      (dataset) => dataset.slug === params.slug
    )

    // blogs
    const blogsPath = await getLocalePath({
      $content,
      app,
      path: 'blogs',
    })

    const blogs = await $content(blogsPath)
      .where({ datasets: { $contains: dataset.slug } })
      .fetch()

    // projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: 'projects',
    })

    const projects = await $content(projectsPath)
      .where({ datasets: { $contains: dataset.slug } })
      .fetch()

    // Related datasets, excluding current
    const datasetCount = {}
    projects.concat(blogs).forEach((article) => {
      article.datasets &&
        article.datasets
          .filter((dataset) => dataset !== params.slug)
          .forEach((dataset) => {
            dataset in datasetCount
              ? datasetCount[dataset]++
              : (datasetCount[dataset] = 1)
          })
    })

    const relatedDatasets = datasets.datasets
      .filter((dataset) => dataset.slug in datasetCount)
      .sort((a, b) => datasetCount[b.slug] - datasetCount[a.slug])

    return {
      dataset,
      blogs,
      projects,
      relatedDatasets,
    }
  },
  data: () => ({ icons }),
  head() {
    const title = this.dataset.title
    return {
      title,
    }
  },
  methods: {
    createBreadCrumbs() {
      const base = this.$router.options.base
      return [
        {
          text: this.$t('home'),
          disabled: false,
          href: base + this.localePath('index').slice(1),
        },
        {
          text: this.$t('datasets'),
          disabled: false,
          href: base + this.localePath('datasets').slice(1),
        },
        {
          text: this.dataset.title,
          disabled: true,
          href: '#',
        },
      ]
    },
  },
}
</script>
