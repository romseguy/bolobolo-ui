import { put } from 'redux-saga/effects'
import { settingsActions } from '@/core/settings'

export default function* setDefaultLocationSaga() {
  yield put(settingsActions.setLocation(48.8566, 2.3522))
  yield put(settingsActions.setDepartment(false))
  yield put(settingsActions.setCity(false))
}
