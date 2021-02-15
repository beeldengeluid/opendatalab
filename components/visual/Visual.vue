<template>
  <div class="visual" :height="height">
    <!-- Visualization -->
    <div class="viewport">
      <Circles
        :datasets="filteredDatasets"
        :width="width"
        :height="height"
        :active-id="activeId"
        :hover-id="hoverId"
        @active-dataset="setActive"
        @hover-dataset="setHover"
      />
    </div>

    <!-- Intro/details -->
    <transition name="slideInLeft">
      <div v-if="activeDataset" class="details">
        <DatasetInfo :dataset="activeDataset" />
        <div
          class="close-button d-flex justify-center align-center d-md-none"
          @click.stop="hideDetails"
        >
          <v-icon dark> mdi-close </v-icon>
        </div>
      </div>
    </transition>

    <!-- Filter -->
    <div class="filter">
      <!-- Filter button on mobile -->
      <v-btn
        class="ma-2 mb-0 d-block d-md-none"
        fab
        dark
        small
        color="primary"
        @click.stop="showTags = !showTags"
      >
        <v-badge
          v-if="tagsFilter.length > 0"
          :content="tagsFilter.length"
          :style="{ transform: 'translate(22px,-12px)' }"
          color="red darken-1"
        />

        <v-icon dark>
          {{ showTags ? 'mdi-close' : 'mdi-filter-variant' }}
        </v-icon>
      </v-btn>

      <!-- Tags list -->
      <transition name="slideInRight">
        <Tags
          v-if="showTags"
          :tags="tags"
          :filter="tagsFilter"
          :highlight="tagsHighlight"
          @toggle-tag="toggleTag"
          @set-tag="setTag"
        />
      </transition>
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
      showTags: process.client ? window.innerWidth > 400 : true,
      width: process.client ? window.innerWidth : 800,
      height: process.client
        ? Math.min(700, Math.max(400, window.innerHeight - 150))
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

      if (this.tagsFilter.length === this.tags.length) {
        this.tagsFilter = []
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
      if (this.activeId) {
        this.scrollToTop()
      }
    },
    hideDetails() {
      this.setActive('')
    },
    setHover(id) {
      if (this.hoverId !== id) {
        this.hoverId = id
      }
    },
    scrollToTop() {
      process.client &&
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        })
    },
  },
}
</script>

<style lang="scss" scoped>
$clDark: rgba(5, 37, 68, 1);

.visual {
  position: relative;
  height: calc(100vh - 150px);
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
  padding: 10px 15px 30px;
  background-color: rgba($clDark, 0.8);
  color: white;
  overflow-y: auto;

  @media (max-width: 500px) {
    width: 100%;
  }
  .close-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 50px;
    background-color: rgba($clDark, 0.8);
  }
}

.filter {
  position: absolute;
  right: 0;
  top: 0;
  max-width: 200px;
}

.slideInLeft-enter-active,
.slideInLeft-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  transform: translateX(0);
}
.slideInLeft-enter,
.slideInLeft-leave-to {
  opacity: 0;
  transform: translateX(-300px);
}

.slideInRight-enter-active,
.slideInRight-leave-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
  transform: translateX(0);
}
.slideInRight-enter,
.slideInRight-leave-to {
  opacity: 0;
  transform: translateX(300px);
}
</style>
