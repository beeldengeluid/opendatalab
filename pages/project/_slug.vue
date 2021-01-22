<template>
  <Fragment>
    <v-breadcrumbs :items="createBreadCrumbs(article)" />
    <Article :article="article" :icon="icon" :color="color" />
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import Article from '../../components/Article'
import { createArticleSlugPage } from '../../util/articleSlugPage'
import icons from '../../config/icons'
import { classColors } from '../../config/theme'

export default createArticleSlugPage({
  source: 'projects',
  components: { Article, Fragment },
  data: () => ({ icon: icons.project, color: classColors.project }),
})
</script>
