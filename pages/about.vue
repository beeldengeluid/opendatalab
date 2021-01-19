<template>
  <v-row>
    <v-col>
      <article>
        <h1>
          <v-icon
            v-if="icon"
            :style="{ marginTop: '-3px', marginRight: '10px' }"
            v-text="icon"
          />{{ page.title }}
        </h1>
        <v-divider class="my-5" />
        <nuxt-content :document="page" />
      </article>
    </v-col>
  </v-row>
</template>

<script>
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'

export default {
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
  data: () => ({ icon: icons.about }),
  head() {
    const title = this.$t('about')
    return {
      title,
    }
  },
}
</script>
