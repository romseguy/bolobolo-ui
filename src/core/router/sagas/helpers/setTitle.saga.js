import { call, getContext, put, take, select } from 'redux-saga/effects'

import { settingsActions, getI18nInitialized } from '@/core/settings'

export default function* setTitleSaga(title) {
  const requiresI18n = typeof title === 'function'

  if (requiresI18n) {
    const initialized = yield select(getI18nInitialized)

    if (!initialized) {
      yield take(settingsActions.I18N_INITIALIZED)
    }

    const i18n = yield getContext('i18n')
    yield put(settingsActions.setTitle(title(i18n)))
  } else {
    yield put(settingsActions.setTitle(title))
  }
}
