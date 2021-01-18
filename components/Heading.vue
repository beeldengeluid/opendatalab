<template>
  <v-row class="justify-start">
    <v-col v-if="icon" class="flex-grow-0">
      <v-icon :style="{ marginTop: '5px' }">{{ icon }}</v-icon>
    </v-col>
    <v-col>
      <h2>{{ title }}</h2>
    </v-col>
    <v-spacer />
  </v-row>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: false, default: null },
    title: { type: String, required: false, default: '' },
  },
}
</script>
