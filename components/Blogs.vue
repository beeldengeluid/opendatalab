<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="article in articles"
        :key="article.slug"
        :to="{ name: 'blog-slug', params: { slug: article.slug } }"
      >
        <v-list-item-icon>
          <v-icon v-text="'mdi-post'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="article.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    articles: { type: Array, required: true },
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
