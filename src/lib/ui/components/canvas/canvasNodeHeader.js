import React from 'react'
import { compose, pure } from 'recompose'
import { Origin } from 'redux-tooltip'

import { getCanvasNodeHeaderTooltipName } from '@/lib/ui/helpers/tooltips'
import modeTypes from '@/lib/constants/modeTypes'

const SVGOrigin = Origin.wrapBy('g')

function CanvasNodeHeader(props) {
  const { currentMode, foreignObjectSupport, node, onClick } = props

  if (!node.name) {
    return null
  }

  let tooltipName = null
  let cursor = 'pointer'

  if (currentMode === modeTypes.DISCOVERY) {
    cursor = 'default'
  } else {
    tooltipName = getCanvasNodeHeaderTooltipName({
      isNew: node.isNew,
      mine: node.mine
    })

    if (!node.mine) {
      cursor = 'move'
    }
  }

  let text = (
    <SVGOrigin name={tooltipName}>
      <text
        alignmentBaseline="middle"
        id={`canvas-node__header-${node.id}`}
        textAnchor="middle"
        x={node.width / 2}
        y={node.height - node.height / 3}
        style={{
          cursor
        }}
      >
        {node.name}
      </text>
    </SVGOrigin>
  )

  if (foreignObjectSupport) {
    text = (
      <foreignObject
        height={node.height / 2}
        x={-(node.width / 2)}
        y={node.height / 2}
        width={node.width * 2}
      >
        <div
          style={{
            textAlign: 'center',
            width: node.width * 2
          }}
        >
          <SVGOrigin name={tooltipName}>
            <label
              id={`canvas-node__header-${node.id}`}
              style={{
                cursor
              }}
              onClick={e => onClick(node)}
            >
              {node.name} {node.distance ? `${node.distance}km` : ''}
            </label>
          </SVGOrigin>
        </div>
      </foreignObject>
    )
  }

  return text
}

export default compose(pure)(CanvasNodeHeader)
