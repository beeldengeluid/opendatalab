<template>
  <article>
    <h1>{{ article.title }}</h1>
    <v-divider class="my-5" />

    <div v-if="article.datasets && article.datasets.length > 0">
      <v-chip
        v-for="dataset of article.datasets"
        :key="dataset.id"
        class="ma-2"
        color="pink"
        label
        link
        :to="
          localePath({
            name: 'dataset-slug',
            params: { slug: dataset.id },
          })
        "
        text-color="white"
      >
        <v-icon left> mdi-database </v-icon>
        {{ dataset.name }}
      </v-chip>
      <v-divider class="my-5" />
    </div>

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
    <p>{{ $t('last_update') }}: {{ formatDate(article.updatedAt) }}</p>

    <prev-next :prev="prev" :next="next" />
  </article>
</template>

<script>
import { formatDate } from '../util/date'

export default {
  props: {
    article: {
      type: Object,
      required: true,
      default: () => ({
        title: 'Empty article',
        subtitle: '',
        slug: '',
        updatedAt: new Date(),
        datasets: [],
        tags: [],
      }),
    },
    prev: {
      type: Object,
      required: false,
      default: null,
    },
    next: {
      type: Object,
      required: false,
      default: null,
    },
  },
  methods: {
    formatDate,
  },
}
</script>
