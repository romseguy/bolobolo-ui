import { call, put, take, select } from 'redux-saga/effects'

import { settingsActions, getCity, getDepartment } from '@/core/settings'

export default function* setLocationTitleSaga() {
  let city = yield select(getCity)

  if (city) {
    yield put(settingsActions.setTitle(`${city}`))
    return
  }

  yield put(settingsActions.setTitle(null))

  const action = yield take(settingsActions.SET_CITY)
  yield put(settingsActions.setTitle(action.payload.city))
}
