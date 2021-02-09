<template>
  <svg id="circles-container" width="100%" height="100%" />
</template>

<script>
import Chart from './Chart'

export default {
  props: {
    datasets: {
      type: Array,
      required: true,
      default: () => [],
    },
    width: {
      type: Number,
      required: true,
      default: 800,
    },
    height: {
      type: Number,
      required: true,
      default: 400,
    },
  },
  watch: {
    datasets() {
      this.chart.setData(this.datasets)
    },
  },
  mounted() {
    this.chart = new Chart(this.datasets, {
      width: this.width,
      height: this.height,
    })
  },
}
</script>

<style lang="scss">
/*! purgecss start ignore */
@import '../../assets/scss/vuetify/customizations';

#circles-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;

  font-family: $heading-font-family;

  .node {
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    user-select: none;
    transition: transform 0.3s ease-out;

    &:hover {
      opacity: 0.2;
    }

    .node-content {
      animation-name: scaleIn;
      animation-duration: 0.5s;
      animation-iteration-count: 1;
      animation-fill-mode: both;
    }
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

@keyframes scaleIn {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}
/*! purgecss end ignore */
</style>
