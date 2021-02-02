<template>
  <div :style="container" class="logo-mark">
    <div
      v-for="(tile, index) of tiles"
      :key="index"
      :style="{ ...tile, ...getPosition(index) }"
      class="tile"
    />
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      required: false,
      default: 14,
    },
    color: {
      type: String,
      required: false,
      default: '#008adb',
    },
  },
  data() {
    const tile = {
      width: this.size + 'px',
      height: this.size + 'px',
      backgroundColor: this.color,
    }

    return {
      tiles: [
        { opacity: 1, ...tile },
        { opacity: 0.66, ...tile },
        { opacity: 0.33, ...tile },

        { opacity: 1, ...tile },
        { opacity: 0.05, ...tile },
        { opacity: 0.66, ...tile },

        { opacity: 1, ...tile },
        { opacity: 1, ...tile },
        { opacity: 0.66, ...tile },
      ],
      container: {
        width: this.size * 3 + 3 + 'px',
        height: this.size * 3 + 3 + 'px',
      },
    }
  },
  methods: {
    getPosition(index) {
      return {
        left: this.size * (index % 3) + (index % 3) + 'px',
        top: Math.floor(index / 3) * (this.size + 1) + 'px',
      }
    },
  },
}
</script>

<style scoped lang="scss">
.logo-mark {
  position: relative;
  animation-name: fadeIn;
  animation-duration: 2s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
  transition: filter 0.3s ease-out;

  .tile {
    position: absolute;
    transition: opacity 1.3s ease-out;
  }

  &:hover {
    filter: brightness(1.2);
    .tile {
      animation-name: blink;
      animation-iteration-count: infinite;
      @for $i from 1 through 100 {
        &:nth-child(#{$i}) {
          animation-delay: #{random(100) / 200}s;
          animation-duration: #{0.1 + random(100) / 50}s;
          filter: brightness(#{0.5 + random(100) / 100})
            hue-rotate(#{random(160)}deg);
        }
      }
    }
  }
}

@keyframes blink {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>
