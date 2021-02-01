<template>
  <table>
    <tbody>
      <tr v-for="(value, key) in object" :key="key">
        <th>{{ key }}</th>
        <td>
          <!-- String -->
          <span v-if="typeof value == 'string'">
            <LinkText :value="value" />
          </span>

          <!-- Number -->
          <span v-else-if="typeof value == 'number'">
            <LinkText :value="value" />
          </span>

          <!-- Typed URI -->
          <span v-else-if="isObjectLink(value)">
            <ObjectLink :value="value" />
          </span>

          <!-- Array of non-objects -->
          <ul
            v-else-if="
              Array.isArray(value) &&
              value.length > 0 &&
              typeof value[0] != 'object'
            "
          >
            <li v-for="v in value" :key="v"><LinkText :value="v" /></li>
          </ul>

          <!-- Array of objects -->
          <Fragment v-else-if="Array.isArray(value) && value.length > 0">
            <DataTable v-for="(v, index) in value" :key="index" :object="v" />
          </Fragment>

          <!-- Object -->
          <DataTable v-else-if="typeof value == 'object'" :object="value" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { Fragment } from 'vue-fragment'
import { isObjectLink } from '../util/objectLink'
import DataTable from './DataTable'
import LinkText from './LinkText'
import ObjectLink from './ObjectLink'

export default {
  name: 'DataTable',
  components: { DataTable, Fragment, LinkText, ObjectLink },
  props: {
    object: {
      type: Object,
      required: true,
      default: null,
    },
  },
  methods: {
    isObjectLink,
  },
}
</script>
