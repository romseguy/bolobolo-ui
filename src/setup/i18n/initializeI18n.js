import config from '@/config'
import debug from '@/lib/helpers/debug'

const i18nOptions = {
  backend: {
    loadPath: `${process.env.REACT_APP_LOCALES_URL}/{{lng}}/{{ns}}.json`,
    crossDomain: true
  },

  cache: {
    enabled: false
  },

  debug: config.debug.i18n,

  defaultNS: 'common',

  fallbackLng: 'en',

  interpolation: {
    escapeValue: false, // not needed for react!!
    formatSeparator: ',',
    format: function(value, format, lng) {
      if (format === 'uppercase') return value.toUpperCase()
      return value
    }
  },

  ns: ['common', 'canvas', 'errors', 'form', 'header', 'map'],

  react: {
    wait: true, // globally set to wait for loaded translations in translate hoc
    exposeNamespace: false // exposes namespace on data-i18next-options to be used in eg. localize-editor
  },

  whitelist: ['en', 'fr']
}

export default function initializeI18n({ currentLang, i18n, onInit }) {
  debug('current language is', currentLang)

  if (currentLang) {
    i18nOptions.lng = currentLang
  }

  i18n.init(i18nOptions, function i18nInitialized() {
    typeof onInit === 'function' && onInit()
  })
}
