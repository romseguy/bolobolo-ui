// Welcome to the app entry point, first we import styling!
import './lib/assets/scss/main.scss'

// react
import React from 'react'
import configureRender from './setup/react'
import Root from './setup/react/root'

// redux
import configureStore from './setup/redux'
import reducers from './core/core.reducers'

// redux-first-router
import configureRouter from './setup/redux/router'
import routes from './routes'

// redux-saga
import configureSagaMiddleware from './setup/redux/saga'
import rootSaga from './setup/setup.saga'

// apollo
import configureClient from './setup/apollo'

// i18next
import configureI18n, { initializeI18n } from './setup/i18n'
import { settingsActions, getLang } from './core/settings'

// others
import initializeWindow from './setup/window'

// configuration
const client = configureClient()
const i18n = configureI18n()
const sagaMiddleware = configureSagaMiddleware(client, i18n)
const router = configureRouter(routes)
const store = configureStore({
  reducers,
  router,
  sagaMiddleware
})
const doRender = configureRender(client, i18n, store)

// pre-rendering initialization
initializeI18n({
  currentLang: getLang(store.getState()),
  i18n,
  onInit: store.dispatch(settingsActions.i18nInitialized())
})
initializeWindow(window)

// rendering
doRender(Root)

// post-rendering initialization
sagaMiddleware.run(rootSaga)
router.initialDispatch()

// Webpack Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept('@/setup/react/root', () => {
    doRender(Root)
  })
}

// dev tools
if (process.env.NODE_ENV === 'development') {
  window.store = store
  window.s = store.getState
  window.ss = window.$$LogSagas
  /*
   require('why-did-you-update').whyDidYouUpdate(React, {
   include: /.*MainPanel.*!/,
   includeFunctions: true,
   groupByComponent: true,
   collapseComponentGroups: false,
   mergeDiffs: true,
   onlyFunctions: true
   })
   */
}
