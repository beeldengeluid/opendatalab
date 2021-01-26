<template>
  <v-card
    class="mx-auto d-flex flex-column white"
    max-width="100%"
    width="270px"
    height="100%"
    hover
    link
    nuxt
    xoutlined
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
      :src="require(`~/assets/images/${card.image}?size=400`).src"
      :gradient="
        color
          ? 'to top right, ' +
            getRGBAColor(color, 0.85) +
            ', ' +
            getRGBAColor(color, 0.3)
          : null
      "
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

      <v-btn fab :color="color || 'blue lighten-2'" text>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { formatDate } from '../util/date'
import { getRGBAColor } from '../util/color'

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
    color: {
      type: String,
      required: false,
      default: '',
    },
  },
  methods: {
    formatDate,
    getRGBAColor,
  },
}
</script>
