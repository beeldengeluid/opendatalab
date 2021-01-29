<template>
  <v-tab-item key="overview" value="overview">
    <section class="mt-0">
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
  },
  data: () => ({ icons, classColors }),
}
</script>

<style lang="scss" scoped>
article {
  margin: 0 20px;
  @media (max-width: 540px) {
    margin: 0;
  }
}
</style>
