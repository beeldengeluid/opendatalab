<template>
  <Fragment>
    <v-breadcrumbs :items="createBreadCrumbs(article)" />
    <Article :article="article" :icon="icon" />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'
import icons from '../../config/icons'

export default createArticleSlugPage({
  source: 'blogs',
  components: { Article, Fragment },
  data: () => ({ icon: icons.blog }),
})
</script>
