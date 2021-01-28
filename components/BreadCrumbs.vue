<template>
  <v-breadcrumbs :items="breadCrumbs">
    <template #divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>

    <template #item="{ item }">
      <v-breadcrumbs-item
        :to="localePath(item.to)"
        :disabled="item.disabled === true"
        nuxt
      >
        <v-icon v-if="item.to == '/'">{{ homeIcon }}</v-icon>
        <span v-else>{{ $t(item.text) }}</span>
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script>
import icons from '../config/icons'
export default {
  props: {
    items: { type: Array, required: true, default: () => [] },
  },
  data() {
    return {
      homeIcon: icons.home,
      breadCrumbs: [
        {
          text: 'home',
          to: '/',
        },
        ...this.items,
      ],
    }
  },
}
</script>
