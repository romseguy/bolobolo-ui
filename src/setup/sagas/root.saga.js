import { all, call, fork } from 'redux-saga/effects'
import makeRestartable from '@/lib/helpers/makeRestartable'
import sagas from '@/core/core.sagas'
import checkOfflineSaga from './checkOffline.saga'
import initializeUserLocationSaga from './initializeUserLocation.saga'

export default function* rootSaga() {
  yield fork(checkOfflineSaga)
  yield fork(initializeUserLocationSaga)

  // DO NOT EDIT BELOW THIS LINE
  yield all(sagas.map(saga => call(makeRestartable(saga))))
}
