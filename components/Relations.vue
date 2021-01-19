<template>
  <v-row class="relations">
    <!-- projects -->
    <v-col v-if="projects && projects.length > 0">
      <h4><v-icon dense>mdi-link-variant</v-icon> {{ $t('projects') }}</h4>
      <ChipList
        :chips="projects"
        color="secondary"
        path="project-slug"
        :icon="icons.project"
      />
    </v-col>

    <!-- blogs -->
    <v-col v-if="blogs && blogs.length > 0">
      <h4><v-icon dense>mdi-link-variant</v-icon> {{ $t('blogs') }}</h4>
      <ChipList
        :chips="blogs"
        color="tertiary"
        path="blog-slug"
        :icon="icons.blog"
      />
    </v-col>

    <!-- related datasets -->
    <v-col v-if="datasets && datasets.length > 0">
      <h4><v-icon dense>mdi-link-variant</v-icon> {{ $t('datasets') }}</h4>
      <ChipList
        :chips="datasets"
        color="primary"
        path="dataset-slug"
        :icon="icons.dataset"
      />
    </v-col>
  </v-row>
</template>

<script>
import icons from '../config/icons'

export default {
  props: {
    projects: { type: Array, required: false, default: null },
    blogs: { type: Array, required: false, default: null },
    datasets: { type: Array, required: false, default: null },
  },
  data: () => ({ icons }),
}
</script>

<style scoped>
.v-icon {
  margin-top: -3px;
}
</style>
