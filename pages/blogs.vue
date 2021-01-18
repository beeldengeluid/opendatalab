<template>
  <CardGrid :cards="cards" path="blog-slug" />
</template>

<script>
import CardGrid from '../components/CardGrid'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { CardGrid },
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
  head() {
    const title = this.$t('blogs')
    return {
      title,
    }
  },
}
</script>
