import { all, call, fork } from 'redux-saga/effects'
import makeRestartable from '@/lib/helpers/makeRestartable'
import sagas from '@/core/core.sagas'
import checkOfflineSaga from './sagas/checkOffline.saga'
import initializeUserLocationSaga from './sagas/initializeUserLocation.saga'

export default function* setupSaga() {
  yield fork(checkOfflineSaga)
  yield fork(initializeUserLocationSaga)

  // DO NOT EDIT BELOW THIS LINE
  yield all(sagas.map(saga => call(makeRestartable(saga))))
}
