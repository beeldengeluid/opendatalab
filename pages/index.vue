<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <h1>{{ page.title }}</h1>
      <v-divider class="my-5" />
      <Counter />
      <v-divider class="my-5" />
      <Datasets :items="datasets.items" />
      <v-divider class="my-5" />
      <nuxt-content :document="page" />
    </v-col>
  </v-row>
</template>

<script>
import Counter from '../components/Counter'
import Datasets from '../components/Datasets'

export default {
  components: {
    Counter,
    Datasets,
  },
  async asyncData({ $content }) {
    const page = await $content('home').fetch()
    const datasets = await $content('datasets').fetch()
    return {
      page,
      datasets,
    }
  },
}
</script>
