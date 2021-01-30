<template>
  <Article :article="article" :data-class="dataClass" />
</template>

<script>
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'

export default createArticleSlugPage({
  source: 'projects',
  components: { Article },
  data: () => ({ dataClass: 'project' }),
})
</script>
