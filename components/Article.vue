<template>
  <article>
    <h1>
      <v-icon
        v-if="icon"
        :style="{ marginTop: '-3px', marginRight: '5px' }"
        v-text="icon"
      />
      {{ article.title }}
    </h1>

    <!-- Optional article navigation -->
    <!-- <nav>
      <ul>
        <li v-for="link of article.toc" :key="link.id">
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </nav> -->

    <v-divider class="my-5" />

    <nuxt-content :document="article" />

    <p class="caption">
      {{ $t('last_update') }}: {{ formatDate(article.updatedAt) }}
    </p>

    <v-divider class="my-5" />

    <!-- relations -->
    <Relations :datasets="article.datasets" />

    <prev-next :prev="prev" :next="next" />
  </article>
</template>

<script>
import icons from '../config/icons'
import { formatDate } from '../util/date'
import Relations from './Relations'

export default {
  components: { Relations },
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
    icon: {
      type: String,
      required: true,
      default: '',
    },
  },
  data: () => ({ icons }),
  methods: {
    formatDate,
  },
}
</script>
