<template>
  <v-tab-item key="overview" value="overview">
    <section class="mt-0">
      <!-- Stats -->
      <v-row
        :style="{ fontSize: '0.8em' }"
        class="
          justify-start
          text-uppercase
          grey--text
          darken-4
          title-font
          pb-2
          mb-3
          flex-wrap
        "
      >
        <v-col
          v-for="(stat, index) of stats"
          :key="index"
          :style="{ borderBottom: '1px solid #eee' }"
          class="flex-shrink-0 text-no-wrap"
        >
          <v-icon size="17" class="pb-0 mr-2" v-text="stat.icon"> </v-icon>
          <strong> {{ stat.text }} </strong>
        </v-col>
      </v-row>

      <!-- Description -->
      <nuxt-content :document="page" />

      <!-- Chiplist -->
      <v-row class="justify-center mt-5">
        <v-col class="limit-width px-3 py-3 mb-2">
          <Relations :projects="projects" />
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col class="limit-width px-3 py-3 mb-2">
          <Relations :blogs="blogs" />
        </v-col>
      </v-row>
    </section>
  </v-tab-item>
</template>
<script>
import Relations from '../Relations'
import icons from '~/config/icons'
import { classColors } from '~/config/theme'

export default {
  components: { Relations },
  props: {
    projects: { type: Array, required: false, default: () => [] },
    blogs: { type: Array, required: false, default: () => [] },
    page: { type: Object, required: false, default: null },
    dataset: { type: Object, required: true, default: null },
  },
  data() {
    return {
      icons,
      classColors,
      stats: [
        {
          icon: 'mdi-domain',
          text: this.dataset.creator?.name,
        },
        {
          icon: 'mdi-file-document-multiple',
          text:
            (this.dataset.distribution?.length
              ? this.dataset.distribution[0].contentSize
              : '-') +
            ' ' +
            this.$t('records'),
        },
        {
          icon: 'mdi-calendar-range',
          // TODO: replace with real data
          text: '1899 - 1978',
        },
      ],
    }
  },
}
</script>
