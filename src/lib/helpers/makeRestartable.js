import { delay } from 'redux-saga'
import { call, spawn } from 'redux-saga/effects'

import debug from '@/lib/helpers/debug'

export default function makeRestartable(saga) {
  return function* restartableSaga() {
    yield spawn(function* run() {
      try {
        yield call(saga)

        if (!['settingsSaga'].includes(saga.name)) {
          debug(`unexpected ${saga.name} termination`, saga)
        }
      } catch (e) {
        debug(`${saga.name} error, the saga will be restarted`, e)
        yield call(saga)
      }
      yield delay(1000) // Avoid infinite failures blocking app TODO use backoff retry policy...
    })
  }
}
