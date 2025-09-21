export const cleanUrl = (url) => {
  if (!url) return ''

  return url
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .replace(/\/$/, '')
}
