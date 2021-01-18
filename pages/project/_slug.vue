<template>
  <Fragment>
    <v-breadcrumbs :items="createBreadCrumbs(article)" />
    <Article :article="article" />
  </Fragment>
</template>

<script>
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'

export default createArticleSlugPage({
  source: 'projects',
  components: { Article },
})
</script>
