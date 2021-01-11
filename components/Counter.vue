<template>
  <v-row>
    <v-col cols="3">
      <h2
        v-if="count > 0"
        :class="{ shake: count != target, shakeable: true }"
        :style="{ animationDuration: 1 / (target - count) + 's' }"
      >
        Count: {{ count }}
      </h2>
    </v-col>
    <v-col>
      <v-btn
        v-if="addition > 0"
        color="primary"
        @click.prevent="incrementCounter"
        >+{{ addition }}</v-btn
      >
    </v-col>
  </v-row>
</template>

<script>
const randomInt = (range = 50) => Math.ceil(Math.random() * range)
const startValue = randomInt(10)
const minAddition = 10

export default {
  data: () => ({
    count: startValue,
    target: startValue,
    addition: -1,
    timer: -1,
  }),
  mounted() {
    this.addition = minAddition + randomInt()
  },
  methods: {
    incrementCounter() {
      this.target += this.addition
      this.addition = minAddition + randomInt()
      this.animate()
    },
    animate() {
      clearTimeout(this.timer)

      const add = () => {
        const diff = this.target - this.count
        if (diff > 0) {
          this.count++
          this.timer = setTimeout(add, 1000 / diff)
        }
      }
      add()
    },
  },
}
</script>

<style>
.shakeable {
  transition: transform 0.2s ease-out;
}

.shake {
  animation: shake 0.3s;
  animation-iteration-count: infinite;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  0% {
    transform: translate3d(0, 0, 0);
  }

  25% {
    transform: translate3d(-2px, 0, 0);
  }

  75% {
    transform: translate3d(2px, 0, 0);
  }
}
</style>
