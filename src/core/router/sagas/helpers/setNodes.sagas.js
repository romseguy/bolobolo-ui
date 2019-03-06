import { call, fork, put, select, take } from 'redux-saga/effects'

import { query } from '@/lib/helpers/apollo'
import { personToNode, placeToNode, userPlaceToNode } from '@/lib/transformers'

import { canvasActions } from '@/core/canvas'
import { mapActions } from '@/core/map'

import myPlacesQuery from '@/lib/graphql/queries/myPlaces.query.graphql'
import placeQuery from '@/lib/graphql/queries/place.query.graphql'
import placesQuery from '@/lib/graphql/queries/places.query.graphql'
import userQuery from '@/lib/graphql/queries/user.query.graphql'

export function* setNodesFromMyPlacesSaga(client, selectedPlaceTitle) {
  yield put(canvasActions.setNodesLoading(true))
  const { myPlaces } = yield call(
    query,
    client,
    { query: myPlacesQuery },
    { from: '/me' }
  )

  let nodes = myPlaces.map((userPlace, nodeId) =>
    userPlaceToNode(nodeId, userPlace)
  )

  if (selectedPlaceTitle) {
    nodes = nodes.map(node =>
      node.name === selectedPlaceTitle ? { ...node, selected: true } : node
    )
  }

  yield put(canvasActions.setNodes(nodes))
  yield put(canvasActions.setNodesLoading(false))
}

export function* setNodesFromPlaceSaga(client, placeTitle) {
  yield put(canvasActions.setNodesLoading(true))

  const { place } = yield call(
    query,
    client,
    {
      query: placeQuery,
      variables: { title: placeTitle }
    },
    {
      cache: false,
      from: 'setNodesFromPlaceSaga'
    }
  )

  yield put(
    canvasActions.setNodes(
      place.users.map((person, nodeId) => personToNode(nodeId, person))
    )
  )
  yield put(canvasActions.setNodesLoading(false))
}

export function* setNodesFromPlacesSaga(client) {
  yield put(mapActions.setNodesLoading(true))

  const { places } = yield call(
    query,
    client,
    { query: placesQuery },
    {
      from: '/',
      cache: true
    }
  )

  yield put(
    mapActions.setNodes(
      places.map((place, nodeId) => placeToNode(nodeId, place))
    )
  )
  yield put(mapActions.setNodesLoading(false))
}

export function* setNodesFromUserSaga(client, username) {
  yield put(canvasActions.setNodesLoading(true))

  const { myPlaces } = yield call(
    query,
    client,
    {
      query: userQuery,
      variables: { username }
    },
    {
      cache: true,
      from: 'setNodesFromUserSaga'
    }
  )

  yield put(
    canvasActions.setNodes(
      myPlaces.map((myPlace, nodeId) => userPlaceToNode(nodeId, myPlace))
    )
  )
  yield put(canvasActions.setNodesLoading(false))
}
