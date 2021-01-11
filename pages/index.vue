<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <h1>Homepage</h1>
      <Counter />
    </v-col>
  </v-row>
</template>

<script>
import Counter from '../components/Counter'

export default {
  components: {
    Counter,
  },
}
</script>
