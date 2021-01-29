<template>
  <HeaderPage v-if="dataset">
    <!-- Heading -->
    <template #heading>
      <BreadCrumbs :items="createBreadCrumbs()" />
    </template>

    <!-- Content -->
    <template #contentColumn>
      <v-col class="py-4">
        <!-- Dataset -->
        <v-row class="justify-center pb-3">
          <v-col class="limit-width px-3 pt-3 mt-3 mb-0 pb-0">
            <section>
              <!--Intro -->
              <h1 class="mb-3">
                <!-- <v-avatar
                  :color="color"
                  size="35"
                  :style="{ marginTop: '-3px', marginRight: '5px' }"
                >
                  <v-icon dark size="20">
                    {{ icon }}
                  </v-icon>
                </v-avatar> -->
                {{ dataset.title }}
              </h1>

              <p>{{ dataset.description }}</p>

              <!-- Stats -->
              <v-row
                :style="{ fontSize: '0.8em' }"
                class="justify-start text-uppercase grey--text darken-4 title-font"
              >
                <!-- Records -->
                <v-col v-if="dataset.distribution.length">
                  <v-icon size="17" class="pb-0 mr-2"
                    >mdi-file-document-multiple</v-icon
                  >
                  <strong>
                    {{ dataset.distribution[0].contentSize }}
                    {{ $t('records') }}
                  </strong>
                </v-col>
              </v-row>

              <!-- Tabs -->
              <v-tabs v-model="activeSubmenu" class="mt-5 light-background">
                <v-tabs-slider color="primary" />

                <v-tab
                  v-for="item in submenu"
                  :key="item"
                  :to="'#' + item"
                  nuxt
                >
                  {{ item }}
                </v-tab>
              </v-tabs>

              <!-- <v-divider /> -->
            </section>
          </v-col>
        </v-row>

        <!-- Tab Content -->
        <v-row class="justify-center mb-3 pt-3 mt-0 white">
          <v-col class="limit-width px-3 py-3 mb-3">
            <section class="px-3">
              <v-tabs-items v-model="activeSubmenu">
                <!-- Overview -->
                <TabOverview :page="page" :projects="projects" :blogs="blogs" />
                <!-- Metadata -->
                <TabMetadata :dataset="dataset" />
              </v-tabs-items>
            </section>
          </v-col>
        </v-row>
      </v-col>
    </template>
  </HeaderPage>
</template>

<script>
import TabOverview from '../../components/dataset/TabOverview'
import TabMetadata from '../../components/dataset/TabMetadata'
import BreadCrumbs from '../../components/BreadCrumbs'
import HeaderPage from '../../components/HeaderPage'
import { getLocalePath } from '../../util/contentFallback'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'
import { enrichDatasets } from '~/util/dataset'

export default {
  components: { HeaderPage, TabOverview, TabMetadata, BreadCrumbs },

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

    // Custom markdown content for dataset
    const mdPath = await getLocalePath({
      $content,
      app,
      path: 'datasets/' + dataset.slug,
    })
    const page = await $content(mdPath)
      .fetch()
      .catch((e) => {
        // ignore error of missing page
      })

    return {
      dataset,
      blogs,
      projects,
      relatedDatasets,
      page,
    }
  },
  data: () => ({
    icons,
    classColors,
    icon: icons.dataset,
    color: classColors.dataset,

    submenu: ['overview', 'metadata'],
    activeSubmenu: null,
  }),
  head() {
    const title = this.dataset.title
    return {
      title,
    }
  },
  mounted() {
    // Set default submenu to hash
    if (!this.$route.hash) {
      window.history.replaceState(
        null,
        window.title,
        this.$route.path + '#' + this.submenu[0]
      )
    }
  },
  methods: {
    createBreadCrumbs() {
      return [
        {
          text: 'datasets',
          to: '/datasets',
        },
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
// article {
//   margin: 0 20px;
//   @media (max-width: 540px) {
//     margin: 0;
//   }
// }
</style>
