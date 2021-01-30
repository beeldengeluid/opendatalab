<template>
  <v-row :id="id" :class="'article-heading ' + colorClass">
    <v-col>
      <!-- Responsive background image -->
      <component :is="'style'" type="text/css">
        @media (max-width: 600px) { #{{ id }} { background-image:
        {{
          getBackGroundImage(
            article.image
              ? require(`~/assets/images/${article.image}?size=600`).src
              : ''
          )
        }}
        } } @media (max-width: 930px) { #{{ id }} { background-image:
        {{
          getBackGroundImage(
            article.image
              ? require(`~/assets/images/${article.image}?size=930`).src
              : ''
          )
        }}
        } } @media (min-width: 930px) { #{{ id }} { background-image:
        {{
          getBackGroundImage(
            article.image
              ? require(`~/assets/images/${article.image}?size=1200`).src
              : ''
          )
        }}
        } }
      </component>

      <!-- Content -->
      <section>
        <NuxtLink class="category" :to="localePath(path)">
          <h3>
            {{ $t(dataClass) }}
          </h3>
        </NuxtLink>
        <h1>{{ article.title }}</h1>
        <p>{{ article.subtitle }}</p>
      </section>
    </v-col>
  </v-row>
</template>

<script>
import { classColorIndex, classColors } from '../config/theme'
import { getImageOverlayCSS } from '../util/color'

export default {
  props: {
    article: {
      type: Object,
      required: true,
      default: null,
      validator: (object) => {
        return object && object.title && object.image && object.subtitle
      },
    },
    dataClass: {
      type: String,
      required: true,
      default: '',
    },
  },
  data() {
    return {
      colorClass: classColorIndex[this.dataClass],
      color: classColors[this.dataClass],
      id: 'heading-' + Math.floor(Math.random() * 100000),
      path: this.dataClass + 's', // blog -> blogs, project -> project etc
    }
  },
  methods: {
    getImageOverlayCSS,
    getBackGroundImage(image) {
      return (
        'linear-gradient( to right, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.0) 100%), ' +
        getImageOverlayCSS(image, this.color, 0.9)
      )
    },
  },
}
</script>
<style scoped lang="scss">
.article-heading {
  background-size: cover;
  background-position: center center;
  padding: 30px 0;
}

h1 {
  color: white;
  padding-bottom: 15px;
}

a.category {
  text-decoration: none;
  color: rgba(white, 0.9);
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
}

p {
  color: white;
  font-size: 1.1em;
  margin: 0;
}
</style>
