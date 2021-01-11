<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title :to="localePath('/')" v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar absolute app dark class="blue-grey darken-4">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <NuxtLink
        :to="localePath('/')"
        :style="{
          textDecoration: 'none',
          color: 'white',
        }"
      >
        <v-toolbar-title>Open Data Lab</v-toolbar-title>
      </NuxtLink>

      <v-spacer></v-spacer>

      <NuxtLink v-if="$i18n.locale != 'en'" :to="switchLocalePath('en')">
        <v-avatar color="black" size="35" class="white--text">EN</v-avatar>
      </NuxtLink>

      <NuxtLink v-if="$i18n.locale != 'nl'" :to="switchLocalePath('nl')">
        <v-avatar color="black" size="35" class="white--text">NL</v-avatar>
      </NuxtLink>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app> </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'home',
          to: '/',
        },
        {
          icon: 'mdi-post',
          title: 'blogs',
          to: '/blogs',
        },
        {
          icon: 'mdi-information',
          title: 'about',
          to: '/about',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Open Data Lab',
    }
  },
}
</script>

<style scoped>
.app-bar-title,
a {
  color: white;
  text-decoration: none;
}
</style>
