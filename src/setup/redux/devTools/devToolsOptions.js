export default {
  actionsBlacklist: [],
  predicate: (state, { type }) => {
    if (type.includes('NODE')) {
      return false
    }

    if (typeof type.startsWith === 'function') {
      if (type.startsWith('redux-tooltip')) {
        return false
      }
    }

    return true
  }
}
