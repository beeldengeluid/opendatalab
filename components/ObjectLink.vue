<template>
  <a :href="href" target="_blank" rel="noopener noreferrer">
    <v-icon size="20">{{ icon }}</v-icon>
    <span>{{ name }}</span>
  </a>
</template>

<script>
import isObjectLink from '../util/objectLink'
import icons from '../config/icons'

export default {
  props: {
    value: {
      type: Object,
      required: true,
      validator: isObjectLink,
    },
  },
  data() {
    console.log(this.value['@type'].toLowerCase())
    return {
      icon: icons[this.value['@type'].toLowerCase()] || icons.link,
      href: this.value['@id'],
      name: this.value.name,
    }
  },
}
</script>

<style scoped lang="scss">
a {
  display: inline-block;
  padding: 4px 8px 4px 4px;
  text-decoration: none;
  margin-top: -5px;
  border: 1px solid rgba(black, 0.2);
  border-radius: 2px;
  i {
    display: inline-block;
    margin-right: 5px;
  }
  span {
    text-decoration: underline;
  }
}
</style>
