<template>
  <v-row v-if="dataset">
    <v-col>
      <h1>{{ dataset.name }}</h1>
      <v-divider class="my-5" />
      <p>{{ dataset.description }}</p>
      <h4>Records: {{ dataset.records }}</h4>
    </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const datasets = await $content('datasets').fetch()
    return {
      datasets,
      dataset: datasets.datasets.find((dataset) => dataset.id === params.slug),
    }
  },
  computed: {
    console: () => console,
  },

  watch: {
    dataset: () => {
      console.log(this.dataset)
    },
  },
  methods: {
    debug: (msg) => {
      console.log(msg)
    },
  },
}
</script>