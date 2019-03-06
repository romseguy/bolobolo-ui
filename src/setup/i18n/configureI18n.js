import i18next from 'i18next'
import XHR from 'i18next-xhr-backend'
// import Cache from 'i18next-localstorage-cache'
// import LanguageDetector from 'i18next-browser-languagedetector'

export default function configureI18n() {
  return i18next.use(XHR)
  // .use(Cache)
  // .use(LanguageDetector)
}
