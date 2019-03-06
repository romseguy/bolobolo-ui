import { createSelector } from 'reselect'

export function getSettings(state) {
  return state.settings
}

export function getOfflineMode(state) {
  return getSettings(state).offlineMode || window.offlineMode
}

export function getI18nInitialized(state) {
  return getSettings(state).i18n.initialized
}

export function getLang(state) {
  return getSettings(state).lang
}

export function getUserLocation(state) {
  return getSettings(state).user.location
}

export function getCity(state) {
  return getUserLocation(state).city
}

export function getDepartment(state) {
  return getUserLocation(state).department
}

export function getTitle(state) {
  return getSettings(state).title
}
