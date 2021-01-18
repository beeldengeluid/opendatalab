<template>
  <v-app light>
    <!-- drawer menu -->
    <v-navigation-drawer v-model="drawer" fixed app disable-resize-watcher>
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
          :style="{ letterSpacing: '0.1rem', fontSize: '1.23rem' }"
        >
          <strong>{{ $t('site_name') }}</strong>
          <div class="title-dot" />
          <strong>{{ $t('site_author') }}</strong>
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

    <v-footer :absolute="!fixed" app> </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'home',
          to: 'index',
        },
        {
          icon: 'mdi-database',
          title: 'datasets',
          to: 'datasets',
        },
        {
          icon: 'mdi-rocket-launch',
          title: 'projects',
          to: 'projects',
        },
        {
          icon: 'mdi-post',
          title: 'blogs',
          to: 'blogs',
        },
        {
          icon: 'mdi-information',
          title: 'about',
          to: 'about',
        },
      ],
    }
  },
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
