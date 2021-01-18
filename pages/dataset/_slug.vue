<template>
  <v-container v-if="dataset">
    <v-breadcrumbs :items="createBreadCrumbs()" />
    <article>
      <h1>{{ dataset.title }}</h1>
      <v-divider class="my-5" />
      <p>{{ dataset.description }}</p>
      <h4>{{ $t('records') }}: {{ dataset.records }}</h4>
    </article>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    // datasets are not localized yet
    const datasets = await $content('datasets').fetch()
    return {
      datasets,
      dataset: datasets.datasets.find(
        (dataset) => dataset.slug === params.slug
      ),
    }
  },
  head() {
    const title = this.dataset.title
    return {
      title,
    }
  },
  methods: {
    createBreadCrumbs() {
      const base = this.$router.options.base
      return [
        {
          text: this.$t('home'),
          disabled: false,
          href: base + this.localePath('index').slice(1),
        },
        {
          text: this.$t('datasets'),
          disabled: false,
          href: base + this.localePath('datasets').slice(1),
        },
        {
          text: this.dataset.title,
          disabled: true,
          href: '#',
        },
      ]
    },
  },
}
</script>
