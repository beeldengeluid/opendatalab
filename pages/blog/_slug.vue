<template>
  <HeaderPage>
    <!-- Heading -->
    <template #heading>
      <BreadCrumbs :items="createBreadCrumbs(article)" />
    </template>

    <!-- Content -->
    <template #content>
      <Article :article="article" :data-class="dataClass" />
    </template>
  </HeaderPage>
</template>

<script>
import HeaderPage from '../../components/HeaderPage'
import Article from '../../components/Article'
import BreadCrumbs from '../../components/BreadCrumbs'
import { createArticleSlugPage } from '../../util/articleSlugPage'
export default createArticleSlugPage({
  source: 'blogs',
  components: { HeaderPage, Article, BreadCrumbs },
  data: () => ({ dataClass: 'blog' }),
})
</script>
