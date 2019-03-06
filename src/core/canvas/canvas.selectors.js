function getCanvas(state) {
  return state.canvas
}

export function getCanvasNodes(state) {
  return getCanvas(state).nodes
}

export function getCanvasNodesLoading(state) {
  return getCanvas(state).nodesLoading
}

export function getSelectedNodeIds(state) {
  return getCanvas(state).selectedNodeIds
}
