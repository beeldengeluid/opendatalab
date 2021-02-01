import colors from 'vuetify/es5/util/colors'
// Maps dataset identifier to image

export const datasetStyle = {
  'https://www.openbeelden.nl/users/beeldengeluid': {
    image: 'datasets/openbeelden_beeldengeluid.jpg',
    color: colors.red.base,
  },
  'https://www.openbeelden.nl/users/stichting_natuurbeelden': {
    image: 'datasets/openbeelden_natuurbeelden.jpg',
    color: colors.green.base,
  },
}

export const randomDatasetStyle = () => {
  const keys = Object.keys(colors)
  return {
    color: colors[keys[Math.floor(Math.random() * keys.length)]],
    image: 'placeholders/placeholder-dataset.jpg',
  }
}
