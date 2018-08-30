/** Capitalizes the first character of string */
export const upperFirst = (str) => {
  return str ? `${str[0].toUpperCase()}${str.slice(1)}` : ''
}

/** Capitalizes first character of string and converts the rest to lowercase */
export const capitalize = (str) => {
  return str ? `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}` : ''
}

/** Return an array of `n` values */
export const range = (n) => {
  return Array(n).fill().map((_, i) => i) // prettier-ignore
}

/** Returns the current performance.now() timestamp */
export const getTimestamp = () => {
  // Falls back to Date.now when window.performance is not available
  if (typeof window.performance !== 'undefined') return window.performance.now()
  else return Date.now()
}

/** Converts duration (in seconds) to MM:SS string */
export const formatTime = (time) => {
  const minutes = Math.floor((time / 60) % 60)
  const seconds = Math.floor(time % 60)
  return [minutes, seconds].map((n) => (n < 10 ? `0${n}` : n)).join(':') // prettier-ignore
}
