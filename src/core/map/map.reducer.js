import { set, push, update } from 'zaphod/compat'

import { settingsActions } from '@/core/settings'

import { mapActions } from './map.actions'

export const mapState = {
  center: null,
  nodes: [],
  nodesLoading: false
}

export function mapReducer(state = mapState, { payload, type }) {
  switch (type) {
    case mapActions.SET_MAP_CENTER:
      return set(state, 'center', payload.center)

    case mapActions.SET_MAP_NODES:
      return set(state, 'nodes', payload.nodes)

    case mapActions.SET_MAP_NODES_LOADING:
      return set(state, 'nodesLoading', payload.loading)

    case settingsActions.SET_LOCATION:
      return set(state, 'center', [payload.location.lat, payload.location.lng])

    default:
      return state
  }
}
