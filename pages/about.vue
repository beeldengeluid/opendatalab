<template>
  <v-row>
    <v-col>
      <BreadCrumbs :items="createBreadCrumbs()" />
      <article>
        <h1 class="mb-3">
          <v-avatar
            :color="color"
            size="35"
            :style="{ marginTop: '-3px', marginRight: '5px' }"
          >
            <v-icon dark size="20">
              {{ icon }}
            </v-icon>
          </v-avatar>
          {{ page.title }}
        </h1>
        <nuxt-content :document="page" />
      </article>
    </v-col>
  </v-row>
</template>

<script>
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'
import BreadCrumbs from '../components/BreadCrumbs'

export default {
  components: { BreadCrumbs },
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
  methods: {
    createBreadCrumbs: () => [
      {
        text: 'about',
        disabled: true,
        to: '',
      },
    ],
  },
}
</script>
