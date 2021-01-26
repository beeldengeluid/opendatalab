<template>
  <v-row>
    <v-col>
      <h3 v-if="title">{{ title }}</h3>
      <v-divider v-if="title" class="my-5" />
      <div class="metadata-table-wrapper">
        <DataTable :object="activeObjects" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import DataTable from './DataTable'

export default {
  components: { DataTable },
  props: {
    object: {
      type: Object,
      required: true,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
    excludeProps: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  data() {
    return {
      activeObjects: Object.keys(this.object).reduce((result, key) => {
        if (!this.excludeProps.includes(key)) {
          result[key] = this.object[key]
        }
        return result
      }, {}),
    }
  },
}
</script>

<style lang="scss">
.metadata-table-wrapper {
  table {
    border-collapse: collapse;
    margin-top: 0;
    th {
      text-align: left;
      vertical-align: top;
      padding: 10px 20px 10px 0;
      text-transform: capitalize;
    }

    td {
      padding: 10px 10px 10px 0;
    }

    td > table {
      margin-top: -10px;
    }
  }
}
</style>
