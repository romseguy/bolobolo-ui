import { channel } from 'redux-saga'
import { call, take } from 'redux-saga/effects'

import debug from '@/lib/helpers/debug'

/**
 * USAGE:
 **

 const client = yield getContext('client')

 yield fork(watchQuerySaga, {client, query: currentUserQuery}, function* onNextSaga({currentUser}) {
  yield put(meActions.setCurrentUser(currentUser))
})
 */

function watchQuery({ channel, client, query, variables }) {
  const queryObservable = client.watchQuery({ query, variables })

  const querySubscription = queryObservable.subscribe({
    next: results => {
      debug(
        `[GRAPHQL] watchQuery ${query.definitions[0].name.value} next`,
        results.data
      )

      channel.put({
        type: 'QUERY_OK',
        payload: {
          results
        }
      })
    },
    error: error => {
      if (!window.offlineMode) {
        debug(
          `[GRAPHQL] watchQuery ${query.definitions[0].name.value} error`,
          error
        )
      }

      channel.put({
        type: 'QUERY_NOK',
        payload: error,
        error: true
      })
    }
  })

  return querySubscription
}

export default function* watchQuerySaga(config, onNextSaga, onErrorSaga) {
  const queryChannel = config.channel || channel()
  const subscription = yield call(watchQuery, {
    ...config,
    channel: queryChannel
  })

  while (true) {
    const { type, payload } = yield take(queryChannel)

    switch (type) {
      case 'QUERY_OK':
        if (typeof onNextSaga === 'function') {
          yield call(onNextSaga, payload.results.data)
        }
        break

      case 'QUERY_NOK':
        if (typeof onErrorSaga === 'function') {
          yield call(onErrorSaga, payload)
        }
        break
    }
  }
}
