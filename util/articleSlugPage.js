import { getLocalePath } from './contentFallback'
import { formatDate } from './date'

// Generic article slug page creator from given article source, e.g. blogs, projects
export const createArticleSlugPage = ({ source, components }) => ({
  async asyncData({ $content, params, app }) {
    const path = await getLocalePath({
      $content,
      app,
      path: `${source}/${params.slug}`,
    })
    const article = await $content(path).fetch()

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

    const datasets = await $content('datasets').fetch()

    // populate datasets on article with dataset object
    article.datasets = article.datasets
      .map((datasetId) =>
        datasets.datasets.find((dataset) => dataset.id === datasetId)
      )
      .filter((d) => d)

    return { article, prev, next }
  },
  head() {
    const title = this.article.title
    return {
      title,
    }
  },
  methods: {
    formatDate,
  },
})
