<template>
  <div>
    <article>
      <h1>{{ project.title }}</h1>
      <v-divider class="my-5" />
      <nav>
        <ul>
          <li v-for="link of project.toc" :key="link.id">
            <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
          </li>
        </ul>
      </nav>
      <v-divider class="my-5" />
      <nuxt-content :document="project" />
      <v-divider class="my-5" />
      <p>{{ $t('last_update') }}: {{ formatDate(project.updatedAt) }}</p>

      <prev-next :prev="prev" :next="next" />
    </article>
  </div>
</template>

<script>
import { getLocalePath } from '../../util/contentFallback'

export default {
  async asyncData({ $content, params, app }) {
    // current project
    const projectPath = await getLocalePath({
      $content,
      app,
      path: `projects/${params.slug}`,
    })
    const project = await $content(projectPath).fetch()

    // prev/next projects
    const projectsPath = await getLocalePath({
      $content,
      app,
      path: `projects`,
    })

    const [prev, next] = await $content(projectsPath)
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.slug)
      .fetch()

    return { project, prev, next }
  },
  head() {
    const title = this.project.title
    return {
      title,
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    },
  },
}
</script>
