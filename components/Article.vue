<template>
  <article>
    <h1>
      <v-icon
        v-if="icon"
        :style="{ marginTop: '-3px', marginRight: '10px' }"
        v-text="icon"
      />
      {{ article.title }}
    </h1>

    <p>{{ article.subtitle }}</p>

    <v-img
      v-if="article.image"
      width="800px"
      height="400px"
      max-height="66vw"
      class="header-image"
      :src="require(`~/assets/images/${article.image}?size=800`).src"
      :srcset="
        require(`~/assets/images/${article.image}?{sizes:[400,800,1200,1600]}`)
          .srcSet
      "
    />

    <!-- Optional article navigation -->
    <!-- <nav>
      <ul>
        <li v-for="link of article.toc" :key="link.id">
          <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
        </li>
      </ul>
    </nav> -->

    <!-- <v-divider class="my-5" /> -->

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

<style scoped lang="scss">
.header-image {
  max-width: calc(100% + 100px);
  margin: 20px -50px;
  border-radius: 5px;

  @media (max-width: 800px) {
    margin: 20px 0;
    max-height: 66vw;
    width: 100%;
  }
}
</style>
