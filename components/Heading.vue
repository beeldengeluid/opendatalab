<template>
  <NuxtLink :to="to" :style="{ textDecoration: 'none', color: 'inherit' }">
    <v-row class="justify-start align-center">
      <v-col v-if="icon" class="flex-grow-0">
        <v-avatar :color="color" size="45">
          <v-icon dark>
            {{ icon }}
          </v-icon>
        </v-avatar>
      </v-col>
      <v-col :style="{ marginLeft: '-10px' }">
        <h2>{{ title }}</h2>
      </v-col>
      <v-spacer />
    </v-row>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    icon: { type: String, required: true, default: null },
    title: { type: String, required: true, default: '' },
    color: { type: String, required: true, default: 'black' },
    to: { type: String, required: false, default: '' },
  },
}
</script>
