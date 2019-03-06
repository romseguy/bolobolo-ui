export default function getLang({ short = false } = {}) {
  let lang = navigator.language || navigator.userLanguage

  if (short) {
    lang = lang.match(/([a-z]+)-[A-Z]+/)[1]
  }

  return lang
}
