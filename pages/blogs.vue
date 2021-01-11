<template>
  <Blogs :articles="articles" />
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
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
