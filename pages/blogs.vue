<template>
  <Fragment>
    <Heading :title="$t('blogs')" :icon="icons.blog" />
    <v-divider class="my-5" />
    <CardGrid :cards="cards" path="blog-slug" :color="color" />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import CardGrid from '../components/CardGrid'
import Heading from '../components/Heading'
import icons from '../config/icons'
import { getLocalePath } from '../util/contentFallback'
import { classColors } from '../config/theme'

export default {
  components: { CardGrid, Fragment, Heading },
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
  data: () => ({ icons, color: classColors.blog }),
  head() {
    const title = this.$t('blogs')
    return {
      title,
    }
  },
}
</script>
