<template>
  <div class="visual" :height="height">
    <!-- Visualization -->
    <div class="viewport">
      <Circles
        :datasets="filteredDatasets"
        :width="width"
        :height="height"
        @active-dataset="setActiveDataset"
      />
    </div>

    <!-- Intro/details -->
    <div class="details">
      <h1>Title</h1>
      <p>Description</p>
    </div>

    <!-- Filter -->
    <div class="filter">
      <Tags
        :tags="tags"
        :filter="tagsFilter"
        @toggle-tag="toggleTag"
        @set-tag="setTag"
      />
    </div>
  </div>
</template>

<script>
import Tags from './Tags'
import Circles from './Circles'

export default {
  components: {
    Tags,
    Circles,
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
      activeDataset: null,
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
    setActiveDataset(dataset) {
      this.activeDataset = dataset
    },
  },
}
</script>

<style lang="scss" scoped>
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
    rgba(5, 37, 68, 1) 100%
  );
}

.viewport {
  height: 100%;
  width: 100%;
}

.details {
  position: absolute;
  left: 0;
  top: 0;
  background: white;
  width: 200px;
}

.filter {
  position: absolute;
  right: 0;
  top: 0;
  max-width: 200px;
}
</style>
