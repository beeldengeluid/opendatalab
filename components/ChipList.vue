<template>
  <div class="mt-3">
    <v-chip
      v-for="chip of chips"
      :key="chip.slug"
      class="ma-2 color-chip"
      :color="color"
      label
      large
      link
      nuxt
      :to="
        localePath({
          name: path,
          params: { slug: chip.slug },
        })
      "
      text-color="white"
      :style="{
        backgroundImage: getImageOverlayCSS(
          chip.image
            ? require(`~/assets/images/${chip.image}?size=300`).src
            : '',
          theme[color]
        ),
      }"
    >
      <v-icon v-if="icon" left size="24" v-text="icon"></v-icon>
      {{ chip.title }}
    </v-chip>
  </div>
</template>

<script>
import theme from '~/config/theme'
import { getImageOverlayCSS } from '~/util/color'

export default {
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

<style scoped lang="scss">
.v-chip {
  padding: 13px;
  background-position: center center !important;
  background-size: cover !important;
  background-repeat: no-repeat !important;
  max-height: 42px;
}
</style>
