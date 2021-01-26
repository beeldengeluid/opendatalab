<template>
  <Fragment v-if="dataset">
    <v-breadcrumbs :items="createBreadCrumbs()" />
    <v-row class="justify-center pb-3">
      <v-col class="limit-width px-3 pt-3 mt-3 mb-0 pb-0">
        <!--Dataset header -->
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
        </article>
        <v-divider class="my-5" />
        <article>
          <p>{{ dataset.description }}</p>
        </article>

        <!-- Tabs -->
        <v-tabs v-model="activeSubmenu">
          <v-tabs-slider color="primary" />

          <v-tab v-for="(item, index) in submenu" :key="item" :to="'#' + item">
            {{ item }}
          </v-tab>
        </v-tabs>

        <!-- <v-divider /> -->
      </v-col>
    </v-row>

    <!-- Content -->
    <v-row class="justify-center light-background-children mb-3 pt-3 mt-0">
      <v-col class="limit-width px-3 py-3 mb-3">
        <v-tabs-items v-model="activeSubmenu" class="light-background-children">
          <!-- Overview -->
          <v-tab-item key="overview" value="overview">
            <v-card flat>
              <!-- Blogs -->
              <v-row class="justify-center my-3 pb-3 light-background-children">
                <v-col class="px-3 py-4 mb-2">
                  <Heading
                    :title="$t('blogs')"
                    :icon="icons.blog"
                    :to="localePath('blogs')"
                    :color="classColors.blog"
                  />
                  <CardGrid
                    :cards="blogs"
                    path="blog-slug"
                    row-class="justify-center"
                    :color="classColors.blog"
                  />
                </v-col>
              </v-row>

              <!-- Chiplist -->

              <v-row class="justify-center my-3 pb-3">
                <v-col class="limit-width px-3 py-3 mb-2">
                  <Relations
                    :projects="projects"
                    :blogs="blogs"
                    :datasets="relatedDatasets"
                  />
                </v-col>
              </v-row>
            </v-card>
          </v-tab-item>

          <!-- Metadata -->
          <v-tab-item key="metadata" value="metadata">
            <v-card flat>
              <!-- All metadata -->
              <article>
                <Metadata :object="dataset" :exclude-props="excludeProps" />
              </article>
            </v-card>
          </v-tab-item></v-tabs-slider>
        </v-tabs-items>
      </v-col>
    </v-row>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Relations from '../../components/Relations'
import Metadata from '../../components/Metadata'
import { getLocalePath } from '../../util/contentFallback'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'
import { enrichDatasets } from '~/util/dataset'

export default {
  components: { Fragment, Relations, Metadata },

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
  data: () => ({
    icons,
    classColors,
    icon: icons.dataset,
    color: classColors.dataset,
    excludeProps: [
      'title',
      'slug',
      'image',
      'color',
      '@context',
      '@type',
      '@id',
      'name',
      'description',
    ],
    submenu: ['overview', 'metadata'],
    activeSubmenu: null,
  }),
  mounted() {
    // Set default submenu to hash
    if (!this.$route.hash) {
      window.history.replaceState(null,window.title,  this.$route.path + '#' + this.submenu[0]);
    }
  },
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

<style lang="scss" scoped>
article {
  margin: 0 20px;
}
</style>
