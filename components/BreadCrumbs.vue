<template>
  <!-- Breadcrumbs -->
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
        <v-icon v-if="item.to == '/'" class="grey--text lighten-3">
          {{ homeIcon }}
        </v-icon>
        <span v-else class="grey--text lighten-3">{{ $t(item.text) }}</span>
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

<style lang="scss">
.v-application {
  .v-breadcrumbs {
    padding: 10px 0 !important;
  }

  .v-breadcrumbs li:nth-child(even) {
    padding: 0;
  }

  .v-breadcrumbs__divider {
    .theme--light.v-icon {
      color: #9e9e9e;
    }
  }

  .v-breadcrumbs__item {
    padding: 5px;
  }
}
</style>
