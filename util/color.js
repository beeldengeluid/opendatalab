export const hexToRGB = (hex) => {
  const bigint = parseInt(hex.startsWith('#') ? hex.slice(1) : hex, 16)
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
}

export const getRGBAColor = (hex, opacity) => {
  const [r, g, b] = hexToRGB(hex)
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')'
}

export const getImageOverlayCSS = (image, hex, opacity = 0.85) => {
  return getGradientCSS(hex, opacity) + ',  url(' + image + ')'
}

export const getGradientCSS = (hex, opacity = 0.85) =>
  'linear-gradient( ' +
  getRGBAColor(hex, opacity) +
  ' 100%, ' +
  getRGBAColor(hex, opacity) +
  ' 100%)'
