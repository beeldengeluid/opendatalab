export const filterObject = (object, excludeProps) =>
  Object.keys(object).reduce((result, key) => {
    if (!excludeProps.includes(key)) {
      result[key] = object[key]
    }
    return result
  }, {})
