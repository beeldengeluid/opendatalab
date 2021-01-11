<template>
  <v-row>
    <v-col>
      <h1>{{ page.title }}</h1>
      <v-divider class="my-5" />
      <nuxt-content :document="page" />
    </v-col>
  </v-row>
</template>

<script>
import { getLocalePath } from '../util/contentFallback'
export default {
  async asyncData({ $content, app }) {
    const aboutPath = await getLocalePath({ $content, app, path: 'about' })
    const page = await $content(aboutPath).fetch()
    return {
      page,
    }
  },
}
</script>
