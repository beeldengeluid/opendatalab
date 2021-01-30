<template>
  <h1>{{ title }} <span :class="colorClass">/</span></h1>
</template>

<script>
import { classColorIndex } from '../config/theme'

export default {
  props: {
    title: { type: String, required: true, default: '' },
    dataClass: { type: String, required: false, default: 'dataset' },
  },
  data() {
    return {
      colorClass: classColorIndex[this.dataClass] + '--text',
    }
  },
}
</script>
