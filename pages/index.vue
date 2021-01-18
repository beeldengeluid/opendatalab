<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <div class="grey lighten-4 px-3 py-3">
        <h2 class="mb-3">{{ $t('datasets') }}</h2>
        <LinkList
          :links="datasets.datasets"
          icon="mdi-database"
          path="dataset-slug"
        />
      </div>
      <v-divider class="my-5" />
      <h2>{{ $t('blogs') }}</h2>
      <CardGrid :cards="blogs" path="blog-slug" row-class="justify-center" />
      <v-divider class="my-5" />
      <article>
        <nuxt-content :document="page" />
      </article>
    </v-col>
  </v-row>
</template>

<script>
import LinkList from '../components/LinkList'
import CardGrid from '../components/CardGrid'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: {
    LinkList,
    CardGrid,
  },
  async asyncData({ $content, app }) {
    const homePath = await getLocalePath({ $content, app, path: 'home' })
    const page = await $content(homePath).fetch()

    const blogsPath = await getLocalePath({
      $content,
      app,
      path: 'blogs',
    })
    const blogs = await $content(blogsPath)
      .sortBy('createdAt', 'asc')
      .limit(5)
      .fetch()

    const datasets = await $content('datasets').fetch()
    return {
      page,
      datasets,
      blogs,
    }
  },
  head() {
    const title = this.$t('home')
    return {
      title,
    }
  },
}
</script>
