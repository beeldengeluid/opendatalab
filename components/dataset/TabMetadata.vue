<template>
  <v-tab-item key="metadata" value="metadata">
    <section>
      <!-- Metadata -->
      <Metadata
        v-if="dataset"
        :object="dataset"
        :exclude-props="excludeProps"
      />

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
import { stripEnrichments } from '../../util/dataset'
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
  data: () => ({
    icons,
    excludeProps: [
      'title',
      'slug',
      'image',
      'color',
      '@context',
      '@type',
      '@id',
      'name',
      'description',
    ],
  }),
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
