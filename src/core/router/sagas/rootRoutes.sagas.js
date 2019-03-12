import { channel } from 'redux-saga'
import { call, fork, put, select, take } from 'redux-saga/effects'

import { toggleAuthModalSaga } from '@/lib/modals'

import currentUserQuery from '@/lib/graphql/queries/currentUser.query.graphql'
import logoutMutation from '@/lib/graphql/mutations/logout.mutation.graphql'

import { routerActions } from '../'
import {
  setLocationTitleSaga,
  setNodesFromPlacesSaga,
  setTitleSaga
} from './helpers'

// routes sagas for / level only!

export function* rootRoutesaga(payload, settings) {}

export function* placesRouteSaga(payload, settings) {
  const { client, onEnter, prevRoute } = settings

  if (![routerActions.AUTH].includes(prevRoute.type)) {
    yield call(setNodesFromPlacesSaga, client)
  }

  yield call(setLocationTitleSaga)
}

export function* aboutRouteSaga(payload, settings) {
  const { i18n } = settings
  yield call(setTitleSaga, i18n => i18n.t('about'))
}

export function* authRouteSaga(payload, settings) {
  const { currentUser, prevRoute } = settings

  if (currentUser) {
    yield put(routerActions.homeRoute())
    return
  }

  yield call(setTitleSaga, i18n => i18n.t('form:auth.title'))

  const onCloseChannel = channel()

  yield call(toggleAuthModalSaga, {
    modalProps: {
      closeOnDimmerClick: false,
      onClose: () => {
        onCloseChannel.put({})
      }
    }
  })

  yield fork(function* onAuthModalClose() {
    yield take(onCloseChannel)

    onCloseChannel.close()

    yield call(toggleAuthModalSaga)

    if (prevRoute.type === '') {
      yield put(routerActions.homeRoute())
    } else {
      if (prevRoute.requiresAuth !== false) {
        yield put(routerActions.homeRoute())
      } else {
        yield put({ type: prevRoute.type })
      }
    }
  })
}

export function* logoutRouteSaga(payload, settings) {
  const { currentUser, client } = settings

  if (currentUser) {
    yield call([client, client.mutate], {
      mutation: logoutMutation,
      refetchQueries: [
        {
          query: currentUserQuery
        }
      ]
    })
  }

  yield put(routerActions.homeRoute())
}

export function* notFoundRouteSaga() {
  yield call(setLocationTitleSaga)
}
