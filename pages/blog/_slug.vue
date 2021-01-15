<template>
  <div>
    <article>
      <h1>{{ article.title }}</h1>
      <v-divider class="my-5" />
      <nav>
        <ul>
          <li v-for="link of article.toc" :key="link.id">
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <v-divider class="my-5" />
      <nuxt-content :document="article" />
      <v-divider class="my-5" />
      <p>Article last updated: {{ formatDate(article.updatedAt) }}</p>

      <prev-next :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script>
import { getLocalePath } from '../../util/contentFallback'

export default {
  async asyncData({ $content, params, app }) {
    // current article
    const articlePath = await getLocalePath({
      $content,
      app,
      path: `articles/${params.slug}`,
    })
    const article = await $content(articlePath).fetch()

    // prev/next articles
    const articlesPath = await getLocalePath({
      $content,
      app,
      path: `articles`,
    })
    const [prev, next] = await $content(articlesPath)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { article, prev, next }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
  head() {
    const title = this.article.title
    return {
      title,
    }
  },
}
</script>
