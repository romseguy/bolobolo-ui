export const mapActions = {
  REFETCH_PLACES: 'REFETCH_PLACES',
  SET_MAP_CENTER: 'SET_MAP_CENTER',
  SET_MAP_NODES: 'SET_MAP_NODES',
  SET_MAP_NODES_LOADING: 'SET_MAP_NODES_LOADING',

  setCenter: center => ({
    type: mapActions.SET_MAP_CENTER,
    payload: { center }
  }),

  setNodes: nodes => ({
    type: mapActions.SET_MAP_NODES,
    payload: { nodes }
  }),

  setNodesLoading: loading => ({
    type: mapActions.SET_MAP_NODES_LOADING,
    payload: { loading }
  })
}
