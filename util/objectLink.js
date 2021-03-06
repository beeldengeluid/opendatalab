import { isUrl } from './url'

export const isObjectLink = (value) => {
  return (
    typeof value === 'object' &&
    !Array.isArray(value) &&
    ['@id', '@type', 'name'].every((key) => key in value) &&
    isUrl(value['@id'])
  )
}
