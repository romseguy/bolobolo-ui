import { call, fork, put, select, take } from 'redux-saga/effects'

import { routerActions } from '../'
import { setNodesFromPlaceSaga, setTitleSaga } from './helpers'

// routes sagas for /place level only!

export function* placeViewRouteSaga(payload, settings) {
  const {} = payload
  const { client, prevRoute } = settings
  const placeTitle = decodeURIComponent(payload.placeTitle)

  if (
    ![
      routerActions.PLACE_SYMBOLS_ADD,
      routerActions.PLACE_SYMBOL_EDIT
    ].includes(prevRoute.type)
  ) {
    yield call(setNodesFromPlaceSaga, client, placeTitle)
  }

  yield call(setTitleSaga, `${placeTitle}`)
}

export function* placeSymbolsAddRouteSaga(payload, settings) {
  const {} = payload
  const { client, i18n, prevRoute } = settings

  const placeTitle = decodeURIComponent(payload.placeTitle)
  const prefix = `form:symbol.${payload.symbolType.toLowerCase()}`
  const title = i18n =>
    i18n.t(`${prefix}.header.add`, {
      placeTitle
    })

  if (![routerActions.PLACE_VIEW].includes(prevRoute.type)) {
    yield call(setNodesFromPlaceSaga, client, placeTitle)
  }

  yield call(setTitleSaga, title)
}

export function* placeSymbolEditRouteSaga(payload, settings) {
  const {} = payload
  const { client, i18n } = settings

  const placeTitle = decodeURIComponent(payload.placeTitle)
  const prefix = `form:symbol.${payload.symbolType.toLowerCase()}`
  const title = i18n =>
    i18n.t(`${prefix}.header.edit`, {
      symbolType: i18n.t(`${prefix}.label`),
      placeTitle
    })

  yield call(setNodesFromPlaceSaga, client, placeTitle)
  yield call(setTitleSaga, title)
}
