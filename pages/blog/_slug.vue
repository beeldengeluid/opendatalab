<template>
  <div>
    <v-breadcrumbs :items="createBreadCrumbs(article)" nuxt />
    <Article :article="article" :icon="icon" :color="color" />
  </div>
</template>

<script>
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'

export default createArticleSlugPage({
  source: 'blogs',
  components: { Article },
  data: () => ({ icon: icons.blog, color: classColors.blog }),
})
</script>
