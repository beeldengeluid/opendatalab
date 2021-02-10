<template>
  <div class="tags">
    <v-btn
      v-for="(tag, index) in tags"
      :key="tag"
      :color="!filterActive || inFilter(tag) ? 'primary' : 'grey darken-3'"
      :style="{
        top: 10 + index * 30 + 'px',
        opacity: highlightActive && !inHighlight(tag) ? 0.5 : 1,
      }"
      height="23"
      class="tag mr-2 py-0 px-2 text-uppercase white--text"
      depressed
      small
      label
      @click.left.exact="$emit('toggle-tag', tag)"
      @click.shift.left.exact="$emit('set-tag', tag)"
    >
      {{ tag.replace('_', ' ') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      required: true,
      default: () => [],
    },
    filter: {
      type: Array,
      required: true,
      default: () => [],
    },
    highlight: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  computed: {
    filterActive() {
      return this.filter.length > 0
    },
    highlightActive() {
      return this.highlight.length > 0
    },
  },
  methods: {
    inFilter(tag) {
      return this.filter.includes(tag)
    },
    inHighlight(tag) {
      return this.highlight.includes(tag)
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  position: absolute;
  top: 10px;
  right: 0px;
  line-height: 1em;
  box-shadow: 1px 1px 5px rgba(black, 0.3);

  .v-chip__content {
    display: block;
  }
}
</style>
