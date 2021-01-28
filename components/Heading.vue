<template>
  <NuxtLink :to="to" :style="{ textDecoration: 'none', color: 'inherit' }">
    <v-row class="justify-start align-center">
      <!-- <v-col v-if="icon" class="flex-grow-0">
        <v-avatar :color="color" size="35">
          <v-icon dark size="20">
            {{ icon }}
          </v-icon>
        </v-avatar>
      </v-col> -->
      <v-col>
        <h1 :style="{ fontSize: '1.8rem' }">{{ title }}</h1>
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
