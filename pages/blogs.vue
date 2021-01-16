<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="card in cards"
        :key="card.slug"
        :cols="card.flex"
        class="mt-2"
      >
        <Card :card="card" path="blog-slug" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { Card },
  async asyncData({ $content, params, app }) {
    const articlesPath = await getLocalePath({
      $content,
      app,
      path: 'articles',
    })
    const articles = await $content(articlesPath)
      .sortBy('createdAt', 'asc')
      .fetch()

    return { cards: articles }
  },
  computed: {
    console: () => console,
  },
  head() {
    const title = this.$t('blogs')
    return {
      title,
    }
  },
}
</script>
