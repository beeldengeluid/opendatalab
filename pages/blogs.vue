<template>
  <div>
    <v-row class="justify-center pb-4">
      <v-col class="limit-width">
        <Heading :title="$t('blogs')" :icon="icon" :color="color" />
      </v-col>
    </v-row>
    <v-row class="justify-center light-background">
      <v-col class="limit-width py-4">
        <CardGrid :cards="cards" path="blog-slug" :data-class="dataClass" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { CardGrid, Heading },
  async asyncData({ $content, params, app }) {
    const articlesPath = await getLocalePath({
      $content,
      app,
      path: 'blogs',
    })
    const articles = await $content(articlesPath)
      .sortBy('createdAt', 'asc')
      .fetch()

    return { cards: articles }
  },
  data: () => ({ dataClass: 'blog' }),
  head() {
    const title = this.$t('blogs')
    return {
      title,
    }
  },
}
</script>
