<template>
  <div class="dataset-info">
    <v-img
      v-if="dataset.image"
      position="top center"
      width="300px"
      max-width="100%"
      height="200px"
      :src="require(`~/assets/images/${dataset.image}?size=300`).src"
      :srcset="
        require(`~/assets/images/${dataset.image}?{sizes:[300,600]}`).srcSet
      "
      :gradient="
        'to top right, ' +
        getRGBAColor(color, 0.85) +
        ', ' +
        getRGBAColor(color, 0.3)
      "
    />

    <h2 class="my-3">{{ dataset.title }}</h2>
    <p>{{ dataset.description }}</p>

    <v-row>
      <v-col>
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
          {{ $t('explore_dataset') }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { getRGBAColor } from '../../util/color'
import { classColors } from '../../config/theme'

export default {
  props: {
    dataset: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      color: classColors.dataset,
    }
  },
  methods: {
    getRGBAColor,
  },
}
</script>

<style lang="scss" scoped>
.dataset-info {
  height: 100%;
  width: 100%;
}
</style>
