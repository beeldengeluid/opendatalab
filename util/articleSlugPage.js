import { getLocalePath } from './contentFallback'
import { enrichDatasets } from './dataset'
import { formatDate } from './date'

// Generic article slug page creator from given article source, e.g. blogs, projects
export const createArticleSlugPage = ({
  source,
  components = {},
  data = {},
}) => ({
  async asyncData({ $content, params, app, error }) {
    const path = await getLocalePath({
      $content,
      app,
      path: `${source}/${params.slug}`,
    })
    const article = await $content(path)
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Article not found' })
      })

    if (!article) {
      return
    }

    // prev/next article
    const articles = await getLocalePath({
      $content,
      app,
      path: source,
    })

    const [prev, next] = await $content(articles)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    const data = await $content('datasets').fetch()

    const datasets = enrichDatasets(data.datasets)

    // populate datasets on article with dataset object
    article.datasets =
      article.datasets &&
      article.datasets
        .map((datasetId) =>
          datasets.find((dataset) => dataset.identifier === datasetId)
        )
        .filter((d) => d)

    return { article, prev, next }
  },
  components,
  data,
  head() {
    const title = this.article.title
    return {
      title,
    }
  },
  methods: {
    formatDate,
    createBreadCrumbs() {
      return [
        {
          text: this.$t('home'),
          disabled: false,
          to: '/',
        },
        {
          text: this.$t(source),
          disabled: false,
          to: '/' + source,
        },
        {
          text: this.article.title,
          disabled: true,
          to: '#',
        },
      ]
    },
  },
})
