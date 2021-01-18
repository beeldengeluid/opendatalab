<template>
  <v-row v-if="dataset">
    <v-col>
      <h1>{{ dataset.title }}</h1>
      <v-divider class="my-5" />
      <p>{{ dataset.description }}</p>
      <h4>{{ $t('records') }}: {{ dataset.records }}</h4>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    // datasets are not localized yet
    const datasets = await $content('datasets').fetch()
    return {
      datasets,
      dataset: datasets.datasets.find(
        (dataset) => dataset.slug === params.slug
      ),
    }
  },
  head() {
    const title = this.dataset.title
    return {
      title,
    }
  },
}
</script>
