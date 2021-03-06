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
              class="black--text d-flex align-center"
            >
              <LogoMark :size="10" />
              <img
                width="160"
                height="39"
                src="~assets/images/odl-text-logo.svg"
                :alt="$t('site_name')"
                class="ml-3"
              />
            </NuxtLink>
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ $t('site_author') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <!-- Menu -->
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

      <v-divider></v-divider>

      <!-- Locales -->
      <v-list>
        <v-list-item
          v-for="locale of $i18n.locales.filter((l) => l.code !== $i18n.locale)"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          nuxt
          router
          exact
        >
          <v-list-item-action>
            <v-icon>mdi-earth</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="text-uppercase">
              <h4>{{ locale.code }}</h4>
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
          <LogoMark />
          <img
            width="180"
            height="44"
            src="~assets/images/odl-text-logo.svg"
            :alt="$t('site_name')"
            class="ml-4"
          />
        </v-toolbar-title>
      </NuxtLink>

      <v-spacer></v-spacer>

      <!-- Tab menu -->
      <v-tabs v-model="activeMenu" class="d-none d-md-flex" right center-active>
        <v-tabs-slider
          v-if="activeMenu !== 'index'"
          color="primary"
          class="v-tabs-slider-wrapper"
        />
        <v-tab :to="localePath(home.to)" class="d-none" />
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
      <div class="language-selector d-none d-lg-block">
        <v-btn
          v-for="locale of $i18n.locales.filter((l) => l.code !== $i18n.locale)"
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          class="text-decoration-none grey--text text--lighten-1 text-uppercase"
          color="blue-grey darken-3 "
          rounded
          :style="{ minWidth: '36px', padding: '0' }"
        >
          {{ locale.code }}
        </v-btn>
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
      :style="{ minHeight: '400px' }"
    >
      <v-row>
        <!-- Column left -->
        <v-col>
          <NuxtLink
            :to="localePath('index')"
            :style="{
              textDecoration: 'none',
              color: 'white',
            }"
            class="ml-3 d-flex"
          >
            <LogoMark />
            <img
              width="180"
              height="44"
              src="~assets/images/odl-text-logo.svg"
              :alt="$t('site_name')"
              class="ml-3"
            />
          </NuxtLink>
        </v-col>

        <!-- Column mid -->
        <v-col> </v-col>

        <!-- Column right -->
        <v-col>
          <!-- Footer menu -->
          <v-list v-model="activeMenu" class="blue-grey darken-4" color="white">
            <v-list-item
              v-for="item in menu"
              :key="item.to"
              :to="localePath(item.to)"
              nuxt
              router
              exact
              dark
            >
              <v-list-item-content>
                <v-list-item-title class="text-uppercase white--text">
                  <h4>{{ $t(item.title) }}</h4>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import menu from '~/config/menu'
import LogoMark from '~/components/LogoMark'

export default {
  components: { LogoMark },
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
      // Active menu for to paths
      const to = this.$route.name
      switch (true) {
        case to.startsWith('index'):
          this.activeMenu = 'index'
          break
        case to.startsWith('blog-to'):
          this.activeMenu = this.localePath('blogs')
          break
        case to.startsWith('dataset-to'):
          this.activeMenu = this.localePath('datasets')
          break
        case to.startsWith('project-to'):
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

.v-tab--active {
  background-color: rgba(white, 0.2);
}

.language-selector {
  margin-left: 10px;
}
</style>
