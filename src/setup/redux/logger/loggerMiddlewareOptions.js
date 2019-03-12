import { canvasActions } from '@/core/canvas'
import { settingsActions } from '@/core/settings'

export default {
  collapsed: true,

  predicate: (getState, { type }) => {
    if (type && typeof type.startsWith === 'function') {
      if (type.startsWith('redux-tooltip')) {
        return false
      }
    }

    return type !== canvasActions.SET_CANVAS_NODES
  }
}
