<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>{{ page.title }}</h1>
      <v-divider class="my-5" />
      <Counter />
      <v-divider class="my-5" />
      <h2>Datasets</h2>
      <Datasets :items="datasets.items" />
      <v-divider class="my-5" />
      <h2>Blogs</h2>
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
export default {
  components: {
    Counter,
    Datasets,
    Blogs,
  },
  async asyncData({ $content }) {
    const page = await $content('home').fetch()
    const datasets = await $content('datasets').fetch()
    const articles = await $content('articles')
      .sortBy('createdAt', 'asc')
      .limit(5)
      .fetch()

    return {
      page,
      datasets,
      articles,
    }
  },
}
</script>
