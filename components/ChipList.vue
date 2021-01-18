<template>
  <Fragment>
    <v-chip
      v-for="chip of chips"
      :key="chip.slug"
      class="ma-2"
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
    >
      <v-icon v-if="icon" left v-text="icon"></v-icon>
      <strong>{{ chip.title }}</strong>
    </v-chip>
  </Fragment>
</template>

<script>
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
}
</script>
