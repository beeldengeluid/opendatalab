<template>
  <ArticlePage :article="article" :data-class="dataClass" />
</template>

<script>
import HeaderPage from '../../components/HeaderPage'
import ArticlePage from '../../components/ArticlePage'
import { createArticleSlugPage } from '../../util/articleSlugPage'
export default createArticleSlugPage({
  source: 'blogs',
  components: { HeaderPage, ArticlePage },
  data: () => ({ dataClass: 'blog' }),
})
</script>
