export default {
  actionsBlacklist: [],
  predicate: (state, { type }) => {
    if (type.includes('NODE')) {
      return false
    }

    if (typeof type.startsWith === 'function') {
      if (type.startsWith('@@redux-form')) {
        return false
      }

      if (type.startsWith('redux-tooltip') || type.startsWith('@@redux-form')) {
        return false
      }
    }

    return true
  }
}
