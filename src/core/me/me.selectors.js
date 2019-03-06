import { createSelector } from 'reselect'

export function getMe(state) {
  return state.me
}

export function getMapCenter(state) {
  return getMe(state).center
}

export function getCurrentUser(state) {
  return getMe(state).currentUser
}
