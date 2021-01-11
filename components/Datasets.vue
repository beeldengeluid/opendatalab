<template>
  <v-card class="mx-auto" max-width="400" tile>
    <v-list-item two-line v-for="item in items" :key="item.id">
      <v-list-item-content>
        <v-list-item-title>{{ item.name }}</v-list-item-title>
        <v-list-item-subtitle>#{{ item.records }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: { items: { type: Array, required: true } },
}
</script>

<style scoped></style>
