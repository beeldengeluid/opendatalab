<template>
  <Fragment>
    <a
      v-if="isUrl(value)"
      :href="value"
      target="_blank"
      rel="noopener noreferrer"
      >{{ value }}</a
    >
    <span v-else>{{ value }}</span>
  </Fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  components: { Fragment },
  props: {
    value: {
      type: [String, Number, Object],
      required: true,
      default: '',
    },
  },
  methods: {
    isUrl(string) {
      let url

      try {
        url = new URL(string)
      } catch (_) {
        return false
      }

      return url.protocol === 'http:' || url.protocol === 'https:'
    },
  },
}
</script>
