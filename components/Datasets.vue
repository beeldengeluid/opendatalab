<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="dataset in datasets"
        :key="dataset.id"
        :to="localePath({ name: 'dataset-slug', params: { slug: dataset.id } })"
      >
        <v-list-item-icon>
          <v-icon v-text="'mdi-database'"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="dataset.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: { datasets: { type: Array, required: true } },
}
</script>

<style scoped></style>
