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
      dark
      class="d-sm-flex d-md-none"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="pb-2">
            <NuxtLink
              :to="localePath('index')"
              :style="{
                textDecoration: 'none',
              }"
              class="black--text"
            >
              <img
                width="180"
                src="~assets/images/odl-text-logo.svg"
                :alt="$t('site_name')"
              />
            </NuxtLink>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('site_author') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list v-model="activeMenu">
        <v-list-item
          v-for="item in menu"
          :key="item.to"
          :to="localePath(item.to)"
          nuxt
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">
              <h4>{{ $t(item.title) }}</h4>
            </v-list-item-title>
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
      <v-app-bar-nav-icon
        class="d-sm-flex d-md-none"
        @click.stop="drawer = !drawer"
      />

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
        >
          <img
            width="180"
            src="~assets/images/odl-text-logo.svg"
            :alt="$t('site_name')"
          />
        </v-toolbar-title>
      </NuxtLink>

      <v-spacer></v-spacer>

      <!-- Tab menu -->
      <v-tabs v-model="activeMenu" class="d-none d-md-flex" right center-active>
        <v-tabs-slider
          v-if="$route.slug !== home.to"
          :key="home.to"
          color="primary"
          class="v-tabs-slider-wrapper"
        />
        <v-tab
          v-for="item in tabMenu"
          :key="item.to"
          :to="localePath(item.to)"
          nuxt
        >
          {{ $t(item.title) }}
        </v-tab>
      </v-tabs>

      <!-- Language selector -->
      <div class="language-selector">
        <NuxtLink
          v-for="locale of $i18n.locales.filter((l) => l.code !== $i18n.locale)"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="text-decoration-none"
        >
          <v-avatar
            color="blue-grey darken-3"
            size="35"
            class="white--text text-uppercase"
          >
            {{ locale.code }}
          </v-avatar>
        </NuxtLink>
      </div>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <v-spacer class="my-5"></v-spacer>

    <v-footer
      :absolute="!fixed"
      class="blue-grey darken-4 white--text"
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
    home: menu[0],
    menu,
    tabMenu: menu.filter((m) => m.title !== 'home'),
    activeMenu: 'blogs',
  }),
  watch: {
    // Listen for route change
    $route() {
      this.updateActiveTab()
    },
  },
  mounted() {
    this.updateActiveTab()
  },
  methods: {
    updateActiveTab() {
      // Active menu for slug paths
      const slug = this.$route.name
      switch (true) {
        case slug.startsWith('blog-slug'):
          this.activeMenu = this.localePath('blogs')
          break
        case slug.startsWith('dataset-slug'):
          this.activeMenu = this.localePath('datasets')
          break
        case slug.startsWith('project-slug'):
          this.activeMenu = this.localePath('projects')
          break
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~assets/scss/vuetify/variables.scss';

.v-tabs-slider-wrapper {
  height: 4px !important;
}

.v-tab--home {
  min-width: 5px;
}

.language-selector {
  margin-left: 10px;
}
</style>
