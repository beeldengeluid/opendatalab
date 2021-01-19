<template>
  <v-app light>
    <!-- drawer menu -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      disable-resize-watcher
      temporary
      floating
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title :style="{ paddingBottom: '2px' }">
            <NuxtLink
              :to="localePath('index')"
              :style="{
                textDecoration: 'none',
              }"
              class="black--text"
            >
              {{ $t('site_name') }}
            </NuxtLink>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('site_author') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="(item, i) in menu"
          :key="i"
          :to="localePath(item.to)"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="$t(item.title)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- site title -->
    <v-app-bar
      fixed
      app
      dark
      elevate-on-scroll
      class="blue-grey darken-4 white--text"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-spacer></v-spacer>

      <NuxtLink
        :to="localePath('index')"
        :style="{
          textDecoration: 'none',
          color: 'white',
        }"
      >
        <v-toolbar-title
          class="d-none d-md-flex align-items-center text-uppercase"
          :style="{
            letterSpacing: '0.05rem',
            fontSize: '1.20rem',
            fontWeight: '500',
          }"
        >
          {{ $t('site_name') }}
          <div class="title-dot" />
          {{ $t('site_author') }}
        </v-toolbar-title>
      </NuxtLink>

      <v-spacer></v-spacer>

      <!-- Language selector -->
      <NuxtLink
        v-for="locale of $i18n.locales.filter((l) => l.code !== $i18n.locale)"
        :key="locale.code"
        :to="switchLocalePath(locale.code)"
        class="text-decoration-none"
      >
        <v-avatar color="black" size="35" class="white--text text-uppercase">
          {{ locale.code }}
        </v-avatar>
      </NuxtLink>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-spacer class="my-5"></v-spacer>

    <v-footer
      :absolute="!fixed"
      class="grey lighten-4 todo"
      app
      :style="{ height: '400px' }"
    >
    </v-footer>
  </v-app>
</template>

<script>
import menu from '../config/menu'

export default {
  data: () => ({
    drawer: false,
    fixed: false,
    menu,
  }),
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/vuetify/variables.scss';

$dotSize: 25px;

.title-dot {
  margin: 0 10px;
  width: $dotSize;
  height: $dotSize;
  background-color: $primary;
  border-radius: $dotSize;
}
</style>
