<template>
  <v-row>
    <v-col>
      <article>
        <Heading :title="page.title" :icon="icon" :color="color" />
        <v-divider class="my-5" />

        <nuxt-content :document="page" />
      </article>
    </v-col>
  </v-row>
</template>

<script>
import Heading from '../components/Heading'
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'

export default {
  components: { Heading },
  async asyncData({ $content, app }) {
    const aboutPath = await getLocalePath({ $content, app, path: 'about' })
    const page = await $content(aboutPath).fetch()
    return {
      page,
    }
  },
  nuxtI18n: {
    paths: {
      en: '/about',
      nl: '/over-ons',
    },
  },
  data: () => ({ icon: icons.about, color: 'primary' }),
  head() {
    const title = this.$t('about')
    return {
      title,
    }
  },
}
</script>
