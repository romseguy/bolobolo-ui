import { createSelector } from 'reselect'

export function getMap(state) {
  return state.map
}

export function getMapCenter(state) {
  return getMap(state).center
}

export function getMapNodes(state) {
  return getMap(state).nodes
}

export function getMapNodesLoading(state) {
  return getMap(state).nodesLoading
}
