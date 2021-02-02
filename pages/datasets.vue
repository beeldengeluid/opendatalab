<template>
  <CardPage
    :cards="cards"
    :title="title"
    :card-path="cardPath"
    :data-class="dataClass"
  />
</template>

<script>
import CardPage from '../components/CardPage'
import { enrichDatasets } from '../util/dataset'

const dataClass = 'dataset'

export default {
  components: { CardPage },
  async asyncData({ $content, app }) {
    const path = dataClass + 's'
    const data = await $content(path).fetch()
    const datasets = enrichDatasets(data.datasets)
    return { cards: datasets }
  },
  data: () => ({
    title: dataClass + 's',
    cardPath: dataClass + '-slug',
    dataClass,
  }),
  head() {
    return {
      title: this.$t(dataClass + 's'),
    }
  },
}
</script>
