<template>
  <div>
    <v-row class="justify-center pb-4">
      <v-col class="limit-width">
        <Heading :title="$t('datasets')" :icon="icon" :color="color" />
      </v-col>
    </v-row>
    <v-row class="justify-center light-background">
      <v-col class="limit-width py-4">
        <CardGrid :cards="cards" path="dataset-slug" :data-class="dataClass" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import { enrichDatasets } from '../util/dataset'

export default {
  components: { CardGrid, Heading },
  async asyncData({ $content }) {
    const data = await $content('datasets').fetch()
    const datasets = enrichDatasets(data.datasets)
    return { cards: datasets }
  },
  data: () => ({ dataClass: 'dataset' }),
  head() {
    const title = this.$t('datasets')
    return {
      title,
    }
  },
}
</script>
