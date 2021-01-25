<template>
  <Fragment v-if="dataset">
    <v-breadcrumbs :items="createBreadCrumbs()" />
    <article>
      <h1 class="mb-3">
        <v-avatar
          :color="color"
          size="35"
          :style="{ marginTop: '-3px', marginRight: '5px' }"
        >
          <v-icon dark size="20">
            {{ icon }}
          </v-icon>
        </v-avatar>
        {{ dataset.title }}
      </h1>
      <v-divider class="my-5" />

      <p>{{ dataset.description }}</p>
      <!-- Retrieve per distribution -->
      <!-- <h4>{{ $t('records') }}: {{ dataset.records }}</h4> -->

      <v-divider class="my-5" />
    </article>

    <v-row class="justify-center my-3 pb-3">
      <v-col class="limit-width px-3 py-3 mb-2">
        <Relations
          :projects="projects"
          :blogs="blogs"
          :datasets="relatedDatasets"
        />
      </v-col>
    </v-row>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Relations from '../../components/Relations'
import { getLocalePath } from '../../util/contentFallback'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'
import { enrichDatasets } from '~/util/dataset'

export default {
  components: { Fragment, Relations },

  async asyncData({ $content, app, params, error }) {
    // datasets are not localized (yet)
    const data = await $content('datasets').fetch()
    const datasets = enrichDatasets(data.datasets)

    const dataset = datasets.find((dataset) => dataset.slug === params.slug)

    if (!dataset) {
      error({ statusCode: 404, message: 'Dataset not found' })
      return
    }

    // blogs
    const blogsPath = await getLocalePath({
      $content,
      app,
      path: 'blogs',
    })

    const blogs = await $content(blogsPath)
      .where({ datasets: { $contains: dataset.identifier } })
      .fetch()

    // projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: 'projects',
    })

    const projects = await $content(projectsPath)
      .where({ datasets: { $contains: dataset.identifier } })
      .fetch()

    // Related datasets, excluding current
    const datasetCount = {}
    projects.concat(blogs).forEach((article) => {
      article.datasets &&
        article.datasets
          .filter((ds) => ds !== dataset.identifier)
          .forEach((ds) => {
            ds in datasetCount ? datasetCount[ds]++ : (datasetCount[ds] = 1)
          })
    })

    const relatedDatasets = datasets
      .filter((ds) => ds.identifier in datasetCount)
      .sort((a, b) => datasetCount[b.identifier] - datasetCount[a.identifier])

    return {
      dataset,
      blogs,
      projects,
      relatedDatasets,
    }
  },
  data: () => ({ icon: icons.dataset, color: classColors.dataset }),
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
