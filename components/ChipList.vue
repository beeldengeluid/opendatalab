<template>
  <Fragment>
    <v-chip
      v-for="chip of chips"
      :key="chip.slug"
      class="ma-2 color-chip"
      :color="color"
      label
      link
      :to="
        localePath({
          name: path,
          params: { slug: chip.slug },
        })
      "
      text-color="white"
      :style="{
        backgroundImage: getImageOverlayCSS(chip.image, theme[color]),
      }"
    >
      <v-icon v-if="icon" left v-text="icon"></v-icon>
      <strong>{{ chip.title }}</strong>
    </v-chip>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import theme from '../config/theme'
import { getImageOverlayCSS } from '../util/color'

export default {
  components: { Fragment },
  props: {
    chips: {
      type: Array,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: false,
      default: 'primary',
    },
    icon: {
      type: String,
      required: false,
      default: '',
    },
  },
  data: () => ({ theme }),
  methods: {
    getImageOverlayCSS,
  },
}
</script>

<style scoped>
.v-chip {
  padding: 20px 20px;
  background-position: center center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
}
</style>
