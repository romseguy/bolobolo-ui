export function getCanvasNodeAnchorTooltipName(modeKey, node) {
  return `canvas-${modeKey}-${node.type}-node__anchor-img--${
    node.selected ? 'selected' : 'unselected'
  }`
}

export function getCanvasNodeHeaderTooltipName({ isNew, mine }) {
  return `canvas-node__header${mine === true ? '--mine' : ''}${
    isNew === true ? '--isNew' : ''
  }`
}

export function getMapNodeAnchorTooltipName({ type }) {
  return `map-${type}-node__anchor-img`
}

export function getMapNodeHeaderTooltipName({ type }) {
  return `map-${type}-node__header`
}

export function getEntitiesTooboxTooltipName({ type }) {
  return `toolbox__entity-${type}`
}

export function getSymbolsTooboxTooltipName({ type }) {
  return `toolbox__symbol-${type}`
}
