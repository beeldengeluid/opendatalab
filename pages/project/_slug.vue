<template>
  <div>
    <BreadCrumbs :items="createBreadCrumbs(article)" />
    <Article :article="article" :icon="icon" :color="color" />
  </div>
</template>

<script>
import Article from '../../components/Article'
import BreadCrumbs from '../../components/BreadCrumbs'
import { createArticleSlugPage } from '../../util/articleSlugPage'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'

export default createArticleSlugPage({
  source: 'projects',
  components: { Article, BreadCrumbs },
  data: () => ({ icon: icons.project, color: classColors.project }),
})
</script>
