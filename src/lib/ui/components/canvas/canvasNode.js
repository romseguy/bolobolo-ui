import React from 'react'
import { pure } from 'recompose'

import CanvasNodeAnchor from './canvasNodeAnchor'
import CanvasNodeHeader from './canvasNodeHeader'

function CanvasNode(props) {
  const { node, onAnchorClick, onHeaderClick, ...rest } = props

  return (
    <g>
      <g onClick={e => onAnchorClick(node)}>
        <CanvasNodeAnchor {...rest} node={node} />
      </g>
      <CanvasNodeHeader {...rest} node={node} onClick={onHeaderClick} />
    </g>
  )
}

export default pure(CanvasNode)
