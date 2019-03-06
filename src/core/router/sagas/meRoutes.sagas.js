import { call, put, select } from 'redux-saga/effects'

import { routerActions } from '@/core/router'

import { setNodesFromMyPlacesSaga, setTitleSaga } from './helpers'

// routes sagas for /me level only!

export function* meRouteSaga(payload, settings) {
  const { client, i18n, onEnter, prevRoute } = settings

  if (
    onEnter ||
    ![routerActions.ME_PLACE_EDIT, routerActions.ME_PLACES_ADD].includes(
      prevRoute.type
    )
  ) {
    yield call(setNodesFromMyPlacesSaga, client)
  }

  yield call(setTitleSaga, i18n => i18n.t('my_profile'))
}

export function* mePlaceEditRouteSaga(payload, settings) {
  const { client, i18n, onEnter, prevRoute } = settings
  const { placeTitle } = payload

  if (
    onEnter ||
    ![routerActions.ME, routerActions.ME_PLACES_ADD].includes(prevRoute.type)
  ) {
    yield call(setNodesFromMyPlacesSaga, client, placeTitle)
  }

  yield call(
    setTitleSaga,
    i18n => `${i18n.t('form:place.title_edit')} ${placeTitle}`
  )
}

export function* mePlacesAddRouteSaga(payload, settings) {
  const { client, i18n, onEnter, prevRoute } = settings

  if (onEnter || ![routerActions.ME].includes(prevRoute.type)) {
    yield call(setNodesFromMyPlacesSaga, client)
  }

  yield call(setTitleSaga, i18n => i18n.t('form:place.title_add'))
}

export function* meSymbolsAddRouteSaga(payload, settings) {
  const { name: symbolType } = payload
  const { currentRoute } = settings

  if (!currentRoute.allowedSymbolTypes.includes(symbolType.toUpperCase())) {
    yield put(routerActions.meRoute())
  }
}
