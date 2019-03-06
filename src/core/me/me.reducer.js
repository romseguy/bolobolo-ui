import { set, push, update } from 'zaphod/compat'
import { meActions } from './me.actions'

export const meState = {
  currentUser: null
}

export function meReducer(state = meState, { payload, type }) {
  switch (type) {
    case meActions.SET_CURRENT_USER:
      return set(state, 'currentUser', payload.currentUser)

    default:
      return state
  }
}
