<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>{{ page.title }}</h1>
      <v-divider class="my-5" />
      <Counter />
      <v-divider class="my-5" />
      <h2>{{ $t('datasets') }}</h2>
      <Datasets :datasets="datasets.datasets" />
      <v-divider class="my-5" />
      <h2>{{ $t('blogs') }}</h2>
      <Blogs :articles="articles" />
      <v-divider class="my-5" />
      <nuxt-content :document="page" />
    </v-col>
  </v-row>
</template>

<script>
import Counter from '../components/Counter'
import Datasets from '../components/Datasets'
import Blogs from '../components/Blogs'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: {
    Counter,
    Datasets,
    Blogs,
  },
  async asyncData({ $content, app }) {
    const homePath = await getLocalePath({ $content, app, path: 'home' })
    const page = await $content(homePath).fetch()

    const articlesPath = await getLocalePath({
      $content,
      app,
      path: 'articles',
    })
    const articles = await $content(articlesPath)
      .sortBy('createdAt', 'asc')
      .limit(5)
      .fetch()

    const datasets = await $content('datasets').fetch()
    return {
      page,
      datasets,
      articles,
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
