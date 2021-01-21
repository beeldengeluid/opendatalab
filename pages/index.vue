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
            :links="datasets.datasets"
            :icon="icons.dataset"
            path="dataset-slug"
          />
        </v-col>
      </v-row>

      <!-- Blogs -->
      <v-row class="justify-center grey lighten-5 my-3 pb-3">
        <v-col class="limit-width px-3 py-3 mb-4">
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

      <!-- Projects -->
      <v-row class="justify-center my-3 pb-3">
        <v-col class="limit-width px-3 py-3 mb-4">
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

      <!-- About -->
      <v-row class="justify-center my-3 pb-3">
        <v-col class="limit-width px-3 py-3 mb-4">
          <v-row>
            <v-col cols="6">
              <v-img
                lazy-src="https://picsum.photos/id/1016/7/4"
                max-height="400"
                max-width="700"
                src="https://picsum.photos/id/1016/700/400"
                class="float-right"
              ></v-img>
            </v-col>
            <v-col cols="6">
              <article>
                <nuxt-content :document="page" />
                <v-btn color="primary" :to="localePath('about')">
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
      .limit(5)
      .fetch()

    // projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: 'projects',
    })
    const projects = await $content(projectsPath)
      .sortBy('createdAt', 'asc')
      .limit(5)
      .fetch()

    const datasets = await $content('datasets').fetch()
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
