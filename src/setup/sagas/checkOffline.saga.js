import { call, put, take } from 'redux-saga/effects'
import { settingsActions } from '@/core/settings'
import { toggleErrorModalSaga } from '@/lib/modals'

export default function* checkOfflineSaga() {
  const { result } = yield take('APOLLO_QUERY_RESULT')

  if (!result || result.message === 'Failed to fetch') {
    yield put({ type: settingsActions.OFFLINE_MODE })
    yield call(toggleErrorModalSaga, {
      modalComponentProps: {
        title: 'System error',
        errors: ['Server is offline']
      }
    })
  }
}
