// @todo see if vendor prefixes are still necessary for raf
export const requestAnimationFrame = window.requestAnimationFrame
export const cancelAnimationFrame = window.cancelAnimationFrame

/** Capitalizes the first character of string */
export const upperFirst = (str) => {
  return str ? `${str[0].toUpperCase()}${str.slice(1)}` : ''
}
