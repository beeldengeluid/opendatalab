import slugify from 'slugify'
import { datasetStyle, randomDatasetStyle } from '../config/datasets'

export const enrichDataset = (dataset) => {
  // fields
  dataset.title = dataset.name
  dataset.slug = slugify(dataset.identifier.replace(/[.:/]/g, ' '), {
    lower: true,
    strict: true,
  })

  // styling
  if (dataset.identifier in datasetStyle) {
    Object.assign(dataset, datasetStyle[dataset.identifier])
  } else {
    Object.assign(dataset, randomDatasetStyle())
  }

  return dataset
}

export const enrichDatasets = (datasets) => {
  return datasets.map((dataset) => enrichDataset(dataset))
}
