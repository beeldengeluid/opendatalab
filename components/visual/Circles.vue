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
    // create chart
    this.chart = new Chart(
      this.datasets,
      {
        width: this.width,
        height: this.height,
      },
      {
        onClick: (dataset) => {
          this.$emit('active-dataset', dataset)
        },
        onHover: (dataset) => {
          this.$emit('hover-dataset', dataset)
        },
      }
    )
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
    animation-duration: 0.3s;
    animation-iteration-count: 1;
    animation-fill-mode: both;
    cursor: pointer;

    transition: transform 0.3s ease-out;

    &.dim {
      .node-content {
        opacity: 0.9;
      }
    }

    &.hover {
      .border {
        opacity: 0.9 !important;
      }
    }

    &.active {
      z-index: 2;
      .border {
        opacity: 1 !important;
        transform: scale(1.03);
      }
    }

    .node-content {
      animation-name: scaleIn;
      animation-duration: 0.3s;
      animation-iteration-count: 1;
      animation-fill-mode: both;
      user-select: none;
      transition: opacity 2s ease-out;

      .border {
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      }
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
