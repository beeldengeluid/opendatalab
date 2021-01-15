<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="article in articles"
        :key="article.slug"
        :to="localePath({ name: 'blog-slug', params: { slug: article.slug } })"
      >
        <v-list-item-icon>
          <v-icon>mdi-post</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="article.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
import Blogs from '../components/Blogs'
import { getLocalePath } from '../util/contentFallback'

export default {
  components: { Blogs },
  async asyncData({ $content, params, app }) {
    const articlesPath = await getLocalePath({
      $content,
      app,
      path: 'articles',
    })
    const articles = await $content(articlesPath)
      .sortBy('createdAt', 'asc')
      .fetch()

    return { articles }
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
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
