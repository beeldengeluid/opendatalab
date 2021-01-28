<template>
  <v-row class="justify-center light-background">
    <v-col class="limit-width py-4">
      <Heading :title="$t('Datasets')" :icon="icon" :color="color" />
      <v-divider class="my-5" />
      <CardGrid :cards="cards" path="dataset-slug" :color="color" />
    </v-col>
  </v-row>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import icons from '../config/icons'
import { classColors } from '../config/theme'
import { enrichDatasets } from '../util/dataset'

export default {
  components: { CardGrid, Heading },
  async asyncData({ $content }) {
    const data = await $content('datasets').fetch()
    const datasets = enrichDatasets(data.datasets)
    return { cards: datasets }
  },
  data: () => ({ icon: icons.dataset, color: classColors.dataset }),
  head() {
    const title = this.$t('datasets')
    return {
      title,
    }
  },
}
</script>
