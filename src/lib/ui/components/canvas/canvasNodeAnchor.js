import React from 'react'
import { compose, pure } from 'recompose'
import { Origin } from 'redux-tooltip'

import icons from '@/lib/assets/icons'
import { getCanvasNodeAnchorTooltipName } from '@/lib/ui/helpers/tooltips'
import modeTypes from '@/lib/constants/modeTypes'

import CanvasNodeImage from './canvasNodeImage'

const SVGOrigin = Origin.wrapBy('g')

function CanvasNodeAnchor(props) {
  const {
    currentMode,
    defaultImageHeight = 50,
    defaultImageWidth = 50,
    node,
    onAnchorMouseOver,
    onAnchorMouseOut
  } = props

  if (!node.iconName) {
    return null
  }

  const imageHeight = node.imageHeight || defaultImageHeight
  const imageWidth = node.imageWidth || defaultImageWidth
  const src =
    node.hovered || node.selected
      ? icons[node.iconNameSelected]
      : icons[node.iconName]
  let tooltipName = getCanvasNodeAnchorTooltipName(currentMode, node)

  if (currentMode === modeTypes.DISCOVERY && node.isNew) {
    tooltipName = null
  }

  return (
    <SVGOrigin
      name={tooltipName}
      onHover={e => onAnchorMouseOver(node)}
      onLeave={e => onAnchorMouseOut(node)}
    >
      <CanvasNodeImage
        id={`canvas-node__anchor-img-${node.id}`}
        currentMode={currentMode}
        height={imageHeight}
        node={node}
        width={imageWidth}
        x={(node.width - imageWidth) / 2}
        xlinkHref={src}
        y="0"
      />
    </SVGOrigin>
  )
}

export default compose(pure)(CanvasNodeAnchor)
