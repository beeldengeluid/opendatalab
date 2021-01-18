<template>
  <v-list>
    <v-list-item-group>
      <v-list-item
        v-for="link in links"
        :key="link.id"
        :to="localePath({ name: path, params: { slug: link.id } })"
      >
        <v-list-item-icon>
          <v-icon v-text="icon"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="link.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  props: {
    links: { type: Array, required: true, default: [] },
    path: { type: String, required: true, default: '' },
    icon: { type: String, required: true, default: 'mdi-post' },
  },
}
</script>

<style scoped></style>
