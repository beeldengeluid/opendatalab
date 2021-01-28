<template>
  <v-row>
    <v-col>
      <!-- Visualization -->
      <v-row class="justify-center my-3">
        <v-col
          class="limit-width todo grey lighten-4 px-3 py-3 mb-3"
          :style="{ height: '80vh' }"
        >
          <h2 class="mb-3">{{ $t('datasets') }}</h2>
          <LinkList
            :links="datasets"
            :icon="icons.dataset"
            path="dataset-slug"
          />
        </v-col>
      </v-row>

      <!-- Projects -->
      <v-row class="justify-center light-background my-3 pb-3">
        <v-col class="limit-width px-3 py-4 mb-2">
          <Heading
            :title="$t('projects')"
            :icon="icons.project"
            :to="localePath('blogs')"
            :color="classColors.project"
          />
          <CardGrid
            :cards="projects"
            path="project-slug"
            row-class="justify-center"
            :color="classColors.project"
          />
        </v-col>
      </v-row>

      <!-- Blogs -->
      <v-row class="justify-center light-background pb-3">
        <v-col class="limit-width px-3 py-3 mb-2">
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

      <!-- About -->
      <v-row class="justify-center light-background my-3 pb-3">
        <v-col class="limit-width px-3 py-3 mb-4">
          <v-row class="white mx-4 my-4 flex-column flex-md-row">
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
            <v-col md="6" class="pl-5">
              <article>
                <nuxt-content :document="page" />
                <v-btn color="primary" :to="localePath('about')" nuxt>
                  {{ $t('read_more') }}
                </v-btn>
              </article>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- -->
    </v-col>
  </v-row>
</template>

<script>
import Heading from '../components/Heading'
import CardGrid from '../components/CardGrid'
import LinkList from '../components/LinkList'
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'
import { classColors } from '../config/theme'
import { enrichDatasets } from '~/util/dataset'

export default {
  components: {
    CardGrid,
    Heading,
    LinkList,
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
