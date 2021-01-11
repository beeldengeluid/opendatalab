<template>
  <Blogs :articles="articles" />
</template>

<script>
import Blogs from '../components/Blogs'

export default {
  components: { Blogs },
  async asyncData({ $content, params }) {
    const articles = await $content('articles')
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
