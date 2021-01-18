<template>
  <Article :article="article" />
</template>

<script>
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'

export default createArticleSlugPage({
  source: 'blogs',
  components: { Article },
})
</script>
