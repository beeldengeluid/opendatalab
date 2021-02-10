<template>
  <div class="dataset-info">
    <h2 class="mb-3">{{ dataset.title }}</h2>
    <p>{{ dataset.description }}</p>

    <v-btn
      color="primary"
      :to="
        localePath({
          name: 'dataset-slug',
          params: { slug: dataset.slug },
        })
      "
      nuxt
    >
      {{ $t('explore') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.dataset-info {
  height: 100%;
  width: 100%;
}
</style>
