<template>
  <v-tab-item key="metadata" value="metadata">
    <section>
      <!-- Metadata -->
      <div>
        <Metadata v-if="filteredDataset" :object="filteredDataset" />
      </div>

      <!-- Download button -->
      <v-row>
        <v-col>
          <v-btn outlined color="primary" @click="downloadDataset">
            <v-icon size="20" left>{{ icons.download }}</v-icon>
            {{ $t('download_metadata') }}
          </v-btn>
        </v-col>
      </v-row>
    </section>
  </v-tab-item>
</template>
<script>
import icons from '../../config/icons'
import Metadata from '../Metadata'
import { stripEnrichments, enrichProps } from '../../util/dataset'
import { filterObject } from '../../util/objects'
import { download } from '../../util/download'

export default {
  components: { Metadata },
  props: {
    dataset: {
      type: Object,
      required: true,
      default: null,
    },
  },
  data() {
    return {
      icons,
      filteredDataset: filterObject(this.dataset, [
        ...enrichProps,
        '@context',
        '@type',
        '@id',
        'name',
        'description',
      ]),
    }
  },
  mounted() {
    console.log(this.filteredDataset)
  },
  methods: {
    downloadDataset() {
      const data = stripEnrichments(this.dataset)
      download(
        JSON.stringify(data, null, 3),
        this.dataset.slug + '.jsonld',
        'application/ld+json'
      )
    },
  },
}
</script>
