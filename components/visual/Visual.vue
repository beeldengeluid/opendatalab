<template>
  <div class="visual" :height="height">
    <!-- Visualization -->
    <div class="viewport">
      <Circles
        :datasets="filteredDatasets"
        :width="width"
        :height="height"
        @active-dataset="setActive"
        @hover-dataset="setHover"
      />
    </div>

    <!-- Intro/details -->
    <div v-if="activeDataset" class="details">
      <DatasetInfo :dataset="activeDataset" />
    </div>

    <!-- Filter -->
    <div class="filter">
      <Tags
        :tags="tags"
        :filter="tagsFilter"
        :highlight="tagsHighlight"
        @toggle-tag="toggleTag"
        @set-tag="setTag"
      />
    </div>
  </div>
</template>

<script>
import Tags from './Tags'
import Circles from './Circles'
import DatasetInfo from './DatasetInfo'

export default {
  components: {
    Tags,
    Circles,
    DatasetInfo,
  },
  props: {
    datasets: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      width: process.client ? window.innerWidth : 800,
      height: process.client
        ? Math.min(700, Math.max(400, window.innerHeight - 100))
        : 400,
      tagsFilter: [],
      tagsHighlight: [],
      activeDataset: null,
      activeId: '',
      hoverDataset: null,
      hoverId: '',
      filteredDatasets: this.datasets,
      tags: Object.keys(
        this.datasets.reduce((tags, dataset) => {
          if (dataset.tags) {
            dataset.tags.forEach((tag) => {
              tags[tag] = true
            })
          }
          return tags
        }, {})
      ),
    }
  },
  watch: {
    tagsFilter() {
      this.filteredDatasets =
        this.tagsFilter.length === 0
          ? this.datasets
          : this.datasets.filter(
              (dataset) =>
                dataset.tags &&
                this.tagsFilter.some((tag) => dataset.tags.includes(tag))
            )
    },
    activeId() {
      this.activeDataset = this.datasets.find(
        (dataset) => dataset.slug === this.activeId
      )
    },
    hoverId() {
      this.hoverDataset = this.datasets.find(
        (dataset) => dataset.slug === this.hoverId
      )

      if (this.hoverDataset) {
        this.tagsHighlight = this.hoverDataset.tags
      } else {
        this.tagsHighlight = []
      }
    },
  },
  methods: {
    toggleTag(tag) {
      if (this.tagsFilter.includes(tag)) {
        this.tagsFilter = this.tagsFilter.filter((t) => t !== tag)
      } else {
        this.tagsFilter = [...this.tagsFilter, tag]
      }
    },
    setTag(tag) {
      if (this.tagsFilter.includes(tag)) {
        this.tagsFilter = []
      } else {
        this.tagsFilter = [tag]
      }
    },
    setActive(id) {
      this.activeId = this.activeId === id ? '' : id
    },
    setHover(id) {
      if (this.hoverId !== id) {
        this.hoverId = id
      }
    },
  },
}
</script>

<style lang="scss" scoped>
$clDark: rgba(5, 37, 68, 1);
.visual {
  position: relative;
  height: calc(100vh - 100px);
  width: 100%;
  max-height: 700px;
  background: rgb(11, 54, 97);
  background: radial-gradient(
    circle,
    rgba(11, 54, 97, 1) 0%,
    rgba(15, 70, 94, 1) 38%,
    $clDark 100%
  );
}

.viewport {
  height: 100%;
  width: 100%;
}

.details {
  z-index: 2;
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  width: 300px;
  height: 100%;
  max-width: 100%;
  padding: 10px 15px;
  background-color: rgba($clDark, 0.8);
  color: white;

  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.filter {
  position: absolute;
  right: 0;
  top: 0;
  max-width: 200px;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-200px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
