<template>
  <v-row class="justify-center">
    <v-col class="limit-width py-4">
      <Heading :title="$t('blogs')" :icon="icon" :color="color" />
      <v-divider class="my-5" />
      <CardGrid :cards="cards" path="blog-slug" :color="color" />
    </v-col>
  </v-row>
</template>

<script>
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import icons from '../config/icons'
import { getLocalePath } from '../util/contentFallback'
import { classColors } from '../config/theme'

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
  data: () => ({ icon: icons.blog, color: classColors.blog }),
  head() {
    const title = this.$t('blogs')
    return {
      title,
    }
  },
}
</script>
