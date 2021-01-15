<template>
  <v-row>
    <v-col> TODO </v-col>
  </v-row>
</template>

<script>
export default {
  async asyncData({ $content, app }) {
    // ..
  },
  head() {
    const title = this.$t('datasets')
    return {
      title,
    }
  },
}
</script>
