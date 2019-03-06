import createSagaMiddleware from 'redux-saga'
import sagaMonitor from './sagaMonitor'

export default function configureSagaMiddleware(client, i18n) {
  return createSagaMiddleware({
    context: {
      client,
      i18n
    },
    sagaMonitor
  })
}
