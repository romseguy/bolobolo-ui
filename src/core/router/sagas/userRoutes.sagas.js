/**
 * routes sagas for /user level only!
 */
import { call, fork, put, select, take } from 'redux-saga/effects'

import { setNodesFromUserSaga, setTitleSaga } from './helpers'

export function* userViewRouteSaga(payload, settings) {
  const { username } = payload
  const { client } = settings

  yield call(setNodesFromUserSaga, client, username)
  yield call(setTitleSaga, `${username}`)
}
