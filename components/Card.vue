<template>
  <v-card
    class="mx-auto d-flex flex-column"
    max-width="100%"
    width="270px"
    height="100%"
    link
    nuxt
    outlined
    :to="
      localePath({
        name: path,
        params: { slug: card.slug },
      })
    "
  >
    <v-img
      class="white--text align-end"
      width="270px"
      height="200px"
      max-width="100%"
      max-height="200px"
      :src="card.image"
    >
      <v-card-title :style="{ textShadow: '1px 1px 5px rgba(0,0,0,0.3)' }">
        {{ card.title }}
      </v-card-title>
    </v-img>

    <v-card-subtitle> {{ card.subtitle }} </v-card-subtitle>

    <v-spacer></v-spacer>

    <v-card-actions>
      <!-- <v-card-text
        class="text-caption grey--text"
        :style="{ marginLeft: '-8px' }"
      >
        {{ formatDate(card.updatedAt) }}
      </v-card-text> -->

      <v-spacer></v-spacer>

      <v-btn fab color="blue lighten-2" text>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from '../util/date'
export default {
  props: {
    card: {
      type: Object,
      required: true,
      default: () => ({ title: 'Empty card' }),
    },
    path: {
      type: String,
      required: true,
      default: '',
    },
  },
  methods: {
    formatDate,
  },
}
</script>
