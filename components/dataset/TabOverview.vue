<template>
  <v-tab-item key="overview" value="overview">
    <v-card flat>
      <!-- Description -->
      <article v-if="page">
        <nuxt-content :document="page" />
      </article>

      <!-- Chiplist -->
      <v-row class="justify-center mt-5 pb-3">
        <v-col class="limit-width px-3 py-3 mb-2">
          <Relations :projects="projects" />
        </v-col>
      </v-row>
      <v-row class="justify-center pb-3">
        <v-col class="limit-width px-3 py-3 mb-2">
          <Relations :blogs="blogs" />
        </v-col>
      </v-row>
    </v-card>
  </v-tab-item>
</template>
<script>
import icons from '../../config/icons'
import { classColors } from '../../config/theme'

export default {
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
