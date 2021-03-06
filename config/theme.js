import colors from 'vuetify/es5/util/colors'

const theme = {
  primary: colors.blue.darken2, // dataset
  secondary: colors.amber.darken3, // project
  tertiary: colors.pink.darken1, // blog
  accent: colors.grey.darken3,
  info: colors.teal.lighten1,
  warning: colors.amber.base,
  error: colors.deepOrange.accent4,
  success: colors.green.accent3,
}

export const classColorIndex = {
  dataset: 'primary',
  project: 'secondary',
  blog: 'tertiary',
}

export const classColors = {
  dataset: theme[classColorIndex.dataset],
  project: theme[classColorIndex.project],
  blog: theme[classColorIndex.blog],
}

export default theme
