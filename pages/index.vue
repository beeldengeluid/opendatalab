<template>
  <v-row>
    <v-col>
      <!-- Datasets / Visualization -->
      <v-row class="justify-center light-background my-3 pb-3">
        <v-col class="limit-width px-3 py-4 mb-2">
          <Heading
            :title="$t('datasets')"
            :description="$t('datasets_description')"
            data-class="dataset"
            :actionPath="'datasets'"
            :actionTitle="$t('all_datasets')"
          />

          <CardGrid
            :cards="datasets"
            path="dataset-slug"
            data-class="dataset"
            row-class="justify-center justify-md-start px-5"
          />
        </v-col>
      </v-row>

      <!-- Projects -->
      <v-row class="justify-center light-background my-3 pb-3">
        <v-col class="limit-width px-3 py-4 mb-2">
          <Heading
            :title="$t('projects')"
            :description="$t('projects_description')"
            data-class="project"
            :actionPath="'projects'"
            :actionTitle="$t('all_projects')"
          />

          <CardGrid
            :cards="projects"
            path="project-slug"
            data-class="project"
            row-class="justify-center justify-md-start px-5"
          />
        </v-col>
      </v-row>

      <!-- Blogs -->
      <v-row class="justify-center light-background pb-3">
        <v-col class="limit-width px-3 py-3 mb-2">
          <Heading
            :title="$t('blogs')"
            :description="$t('blogs_description')"
            data-class="blog"
            :actionPath="'blogs'"
            :actionTitle="$t('all_blogs')"
          />
          <CardGrid
            :cards="blogs"
            path="blog-slug"
            data-class="blog"
            row-class="justify-center justify-md-start px-5"
          />
        </v-col>
      </v-row>

      <!-- About -->
      <v-row class="justify-center light-background my-3 pb-3">
        <v-col class="limit-width mb-4">
          <Heading
            :title="$t('about')"
            :description="$t('about_description')"
          />

          <v-row class="white mx-4 my-6 flex-column flex-md-row">
            <v-col md="6" class="px-0 py-0">
              <v-img
                max-height="400"
                max-width="100%"
                width="100%"
                :src="require(`~/assets/images/about.jpg?size=700`).src"
                class="float-right"
                gradient="to top right, rgba(0,138,219,0.85), rgba(0,138,219,0.2)"
              ></v-img>
            </v-col>
            <v-col
              md="6"
              class="pa-10 d-flex flex-column justify-center align-start"
            >
              <nuxt-content :document="page" />
              <v-btn color="primary" :to="localePath('about')" nuxt>
                {{ $t('read_more') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- -->
    </v-col>
  </v-row>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'
import { classColors } from '../config/theme'
import { enrichDatasets } from '~/util/dataset'

export default {
  components: {
    CardGrid,
    Heading,
  },
  async asyncData({ $content, app }) {
    const homePath = await getLocalePath({ $content, app, path: 'home' })
    const page = await $content(homePath).fetch()

    // blogs
    const blogsPath = await getLocalePath({
      $content,
      app,
      path: 'blogs',
    })
    const blogs = await $content(blogsPath)
      .sortBy('createdAt', 'asc')
      .limit(4)
      .fetch()

    // projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: 'projects',
    })
    const projects = await $content(projectsPath)
      .sortBy('createdAt', 'asc')
      .limit(4)
      .fetch()

    const data = await $content('datasets').fetch()
    const datasets = enrichDatasets(data.datasets)

    return {
      page,
      datasets,
      blogs,
      projects,
    }
  },
  data: () => ({
    icons,
    classColors,
  }),
  head() {
    const title = this.$t('home')
    return {
      title,
    }
  },
}
</script>
