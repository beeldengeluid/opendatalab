import slugify from 'slugify'
import { stripObject } from './objects'
import { getRandomColor } from './color'

export const enrichDataset = (dataset) => {
  // Props
  dataset.title = dataset.name
  dataset.subtitle = dataset.description
  dataset.slug = slugify(dataset.identifier.replace(/[.:/]/g, ' '), {
    lower: true,
    strict: true,
  })

  // Random styling by default
  Object.assign(dataset, randomDatasetStyle())

  return dataset
}

export const enrichDatasets = (datasets) => {
  return datasets.map((dataset) => enrichDataset(dataset))
}

export const enrichProps = [
  'title',
  'subtitle',
  'slug',
  'image',
  'color',
  'tags',
]

export const stripEnrichments = (dataset) => stripObject(dataset, enrichProps)

export const randomDataSet = ({ id, name, contentSize }) => {
  return {
    '@context': {
      '@vocab': 'http://schema.org/',
    },
    '@type': 'Dataset',
    '@id': 'https://example.com/my-uid-' + id,
    identifier: 'https://example.com/my-uid-' + id,
    name: name || 'Random dataset #' + id,
    description:
      'Lorem markdownum perdidit ad loco occallescere dextrum more est, pabula tantique.',
    license: 'https://creativecommons.org/licenses/by-sa/3.0/',
    inLanguage: 'nl-NL',
    creator: {
      '@id': 'https://example.com/my-org-' + id,
      '@type': 'Organization',
      name: 'Random Inc',
    },
    publisher: {
      '@id': 'https://example.com/my-org-' + id,
      '@type': 'Organization',
      name: 'Random Inc',
    },
    distribution: [
      {
        '@type': 'DataDownload',
        contentUrl: 'https://example.com/download',
        encodingFormat: [
          'http://publications.europa.eu/resource/authority/file-type/XML',
        ],
        name: 'http://netwerkdigitaalerfgoed.nl/def/soort#oai-pmh',
        license: 'https://creativecommons.org/licenses/by-sa/3.0/',
        description: 'Fake OAI-PMH Data Provider without any content',
        inLanguage: ['nl-NL'],
        datePublished: '2010-01-01T08:51',
        dateModified: '2021-01-19T08:52',
        contentSize: contentSize || Math.round(Math.random() * 1200 + id * 133),
      },
    ],
    tags: ['public domain', 'linked data', 'api', 'oai-pmh'].filter(
      () => Math.random() > 0.4
    ),
  }
}

export const randomDatasetStyle = () => {
  return {
    color: getRandomColor(),
    image: 'placeholders/placeholder-dataset.jpg',
  }
}
