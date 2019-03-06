export const canvasActions = {
  ADD_NODE: 'ADD_NODE',
  DELETE_SERVER_NODE: 'DELETE_SERVER_NODE',
  HOVER_NODE: 'HOVER_NODE',
  REMOVE_NODE: 'REMOVE_NODE',
  SELECT_ALL_NODES: 'SELECT_ALL_NODES',
  SELECT_NODE: 'SELECT_NODE',
  SELECT_NODES: 'SELECT_NODES',
  SET_CANVAS_NODES: 'SET_CANVAS_NODES',
  SET_CANVAS_NODES_LOADING: 'SET_CANVAS_NODES_LOADING',
  UNSELECT_NODES: 'UNSELECT_NODES',

  addNode: node => ({
    type: canvasActions.ADD_NODE,
    payload: { node }
  }),

  deleteServerNode: node => ({
    type: canvasActions.DELETE_SERVER_NODE,
    payload: { node }
  }),

  hoverNode: (hovered, node) => ({
    type: canvasActions.HOVER_NODE,
    payload: {
      hovered,
      node
    }
  }),

  removeNode: node => ({
    type: canvasActions.REMOVE_NODE,
    payload: { node }
  }),

  selectNode: (selected, node) => ({
    type: canvasActions.SELECT_NODE,
    payload: {
      node,
      selected
    }
  }),

  selectNodes: (selectedNodeIds /* omit => unselect all nodes */) => ({
    type: canvasActions.SELECT_NODES,
    payload: { selectedNodeIds }
  }),

  setNodes: nodes => ({
    type: canvasActions.SET_CANVAS_NODES,
    payload: { nodes }
  }),

  setNodesLoading: loading => ({
    type: canvasActions.SET_CANVAS_NODES_LOADING,
    payload: { loading }
  }),

  unselectNodes: (unselectedNodeIds /* omit => unselect all nodes */) => ({
    type: canvasActions.UNSELECT_NODES,
    payload: { unselectedNodeIds }
  })
}
