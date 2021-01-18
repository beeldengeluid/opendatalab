<template>
  <v-container>
    <v-breadcrumbs :items="createBreadCrumbs(article)" />
    <Article :article="article" />
  </v-container>
</template>

<script>
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'

export default createArticleSlugPage({
  source: 'blogs',
  components: { Article },
})
</script>
