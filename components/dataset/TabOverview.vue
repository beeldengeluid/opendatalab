<template>
  <v-tab-item key="overview" value="overview">
    <section class="mt-0">
      <!-- Stats -->
      <v-row
        :style="{ fontSize: '0.8em' }"
        class="justify-start direction-column text-uppercase grey--text darken-4 title-font pb-2"
      >
        <!-- Records -->
        <v-col v-if="dataset.distribution.length">
          <v-icon size="17" class="pb-0 mr-2">
            mdi-file-document-multiple
          </v-icon>
          <strong>
            {{ dataset.distribution[0].contentSize }}
            {{ $t('records') }}
          </strong>
        </v-col>

        <!-- Records -->
        <v-col v-if="dataset && dataset.distribution.length">
          <v-icon size="17" class="pb-0 mr-2">mdi-date-range</v-icon>
          <strong>
            {{ dataset.distribution[0].contentSize }}
            {{ $t('records') }}
          </strong>
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
import icons from '../../config/icons'
import { classColors } from '../../config/theme'
import Relations from '../Relations'

export default {
  components: { Relations },
  props: {
    projects: { type: Array, required: false, default: () => [] },
    blogs: { type: Array, required: false, default: () => [] },
    page: { type: Object, required: false, default: null },
    dataset: { type: Object, required: true, default: null },
  },
  data: () => ({ icons, classColors }),
}
</script>
