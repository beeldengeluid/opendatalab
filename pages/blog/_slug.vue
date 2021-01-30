<template>
  <Article :article="article" :data-class="dataClass" />
</template>

<script>
import HeaderPage from '../../components/HeaderPage'
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'
export default createArticleSlugPage({
  source: 'blogs',
  components: { HeaderPage, Article },
  data: () => ({ dataClass: 'blog' }),
})
</script>
