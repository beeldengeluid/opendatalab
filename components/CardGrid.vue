<template>
  <v-container fluid>
    <v-row dense :class="rowClass">
      <v-col
        v-for="card in cards"
        :key="card.slug"
        :cols="card.flex"
        class="mt-2"
      >
        <Card :card="card" :path="path" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Card from '../components/Card'

export default {
  components: { Card },
  props: {
    cards: { type: Array, required: true, default: () => [] },
    path: { type: String, required: true, default: '' },
    rowClass: { type: String, required: false, default: '' },
  },
}
</script>
