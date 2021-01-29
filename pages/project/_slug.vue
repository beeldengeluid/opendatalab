<template>
  <HeaderPage>
    <!-- Heading -->
    <template #heading>
      <BreadCrumbs :items="createBreadCrumbs(article)" />
    </template>

    <!-- Content -->
    <template #content>
      <Article :article="article" :icon="icon" :color="color" />
    </template>
  </HeaderPage>
</template>

<script>
import HeaderPage from '../../components/HeaderPage'
import Article from '../../components/Article'
import BreadCrumbs from '../../components/BreadCrumbs'
import { createArticleSlugPage } from '../../util/articleSlugPage'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'

export default createArticleSlugPage({
  source: 'projects',
  components: { HeaderPage, Article, BreadCrumbs },
  data: () => ({ icon: icons.project, color: classColors.project }),
})
</script>
