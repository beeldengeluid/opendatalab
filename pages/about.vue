<template>
  <HeaderPage>
    <!-- Heading -->
    <template #heading>
      <Heading :title="page.title" data-class="dataset"
    /></template>

    <!-- Content -->
    <template #content>
      <section>
        <nuxt-content :document="page" />
      </section>
    </template>
  </HeaderPage>
</template>

<script>
import { getLocalePath } from '../util/contentFallback'
import icons from '../config/icons'
import HeaderPage from '../components/HeaderPage'
import Heading from '../components/Heading'

export default {
  components: { HeaderPage, Heading },
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
    createBreadCrumbs: () => [],
  },
}
</script>
