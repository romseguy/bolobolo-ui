import R from 'ramda'
import { merge, set, setIn, updateIn, push } from 'zaphod/compat'

import { canvasActions } from './canvas.actions'

export const canvasState = {
  nodes: [],
  nodesLoading: false,
  selectedNodeIds: []
}

export function canvasReducer(state = canvasState, { payload, type }) {
  switch (type) {
    case canvasActions.ADD_NODE:
      return updateIn(state, ['nodes'], nodes =>
        push(nodes, {
          ...payload.node,
          id: nodes.length
        })
      )

    case canvasActions.DELETE_SERVER_NODE:
      // core.canvas.saga.deleteServerNodeSaga
      return state

    case canvasActions.HOVER_NODE:
      return updateIn(state, ['nodes'], nodes =>
        nodes.map(node => {
          if (node.id === payload.node.id) {
            return { ...node, hovered: payload.hovered }
          }

          return node
        })
      )

    case canvasActions.REMOVE_NODE:
      state = updateIn(state, ['nodes'], nodes =>
        nodes.filter(node => node.id !== payload.node.id)
      )
      state = updateIn(state, ['selectedNodeIds'], nodeIds =>
        nodeIds.filter(nodeId => nodeId !== payload.node.id)
      )
      return state

    case canvasActions.SELECT_NODE:
      state = updateIn(state, ['nodes'], nodes =>
        nodes.map(node => {
          if (node.id === payload.node.id) {
            return { ...node, selected: payload.selected }
          }

          //return node
          return { ...node, selected: false }
        })
      )

      state = updateIn(state, ['selectedNodeIds'], selectedNodeIds => {
        if (payload.selected) {
          //return push(selectedNodeIds, payload.node.id)
          return [payload.node.id]
        } else {
          //return selectedNodeIds.filter(selectedNodeId => selectedNodeId !== payload.node.id)
          return []
        }
      })

      return state

    case canvasActions.SELECT_NODES:
      const selectAll = !payload.selectedNodeIds

      state = updateIn(state, ['selectedNodeIds'], selectedNodeIds => {
        return selectAll
          ? state.nodes.map(node => node.id)
          : R.unionWith(R.equals, selectedNodeIds, payload.selectedNodeIds)
      })

      state = updateIn(state, ['nodes'], nodes =>
        nodes.map(node => {
          if (selectAll || payload.selectedNodeIds.includes(node.id)) {
            return { ...node, selected: true }
          }
          return node
        })
      )

      return state

    case canvasActions.SET_CANVAS_NODES:
      return setIn(state, ['nodes'], payload.nodes)

    case canvasActions.SET_CANVAS_NODES_LOADING:
      return set(state, 'nodesLoading', payload.loading)

    case canvasActions.UNSELECT_NODES:
      const unselectAll = !payload.selectedNodeIds

      state = updateIn(state, ['selectedNodeIds'], selectedNodeIds => {
        return unselectAll
          ? []
          : selectedNodeIds.filter(
              selectedNodeId =>
                !payload.unselectedNodeIds.includes(selectedNodeId)
            )
      })

      state = updateIn(state, ['nodes'], nodes =>
        nodes.map(node => {
          if (unselectAll || payload.unselectedNodeIds.includes(node.id)) {
            return { ...node, selected: false }
          }
          return node
        })
      )

      return state

    default:
      return state
  }
}
