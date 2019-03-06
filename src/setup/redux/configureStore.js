import config from '@/config'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

export default function configureStore(params) {
  const { reducers, router, sagaMiddleware } = params

  let composeEnhancers = compose

  // middlewares
  const middlewares = [sagaMiddleware, router.middleware]

  // dev tools
  if (config.debug.devTools) {
    const devToolsOptions = require('./devTools').devToolsOptions
    composeEnhancers = composeWithDevTools(devToolsOptions)
  }

  if (config.debug.logger) {
    const configureLoggerMiddleware = require('./logger').default
    middlewares.push(configureLoggerMiddleware())
  }

  // enhancer
  const enhancer = composeEnhancers(
    router.enhancer,
    applyMiddleware(...middlewares)
  )

  // reducer
  const reducer = combineReducers({
    ...reducers,
    location: router.reducer
  })

  // store
  return createStore(reducer, enhancer)
}
