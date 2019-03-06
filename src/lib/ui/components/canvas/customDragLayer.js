import React, { Component } from 'react'
import { DragLayer } from 'react-dnd'
import canvasItemTypes from '@/lib/constants/canvasItemTypes'
import CanvasNode from './canvasNode'

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%'
}

const getItemStyles = (props, zoomLevel) => {
  const { currentOffset, initialOffset, item, itemType } = props

  if (!initialOffset || !currentOffset) {
    return {
      display: 'none'
    }
  }

  let { x, y } = currentOffset

  if (itemType === canvasItemTypes.CANVAS_NODE) {
    x += item.node.width / 2
  }

  const transform =
    `translate(${x}px, ${y}px)` + (zoomLevel ? ` scale(${zoomLevel})` : '')

  return {
    transform,
    WebkitTransform: transform,
    overflow: 'visible'
  }
}

const getRotateStyles = () => {
  return {
    display: 'inline-block',
    transform: 'rotate(-7deg)',
    WebkitTransform: 'rotate(-7deg)'
  }
}

function collect(monitor) {
  return {
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }
}

class CustomDragLayer extends Component {
  render() {
    const { item, itemType, isDragging } = this.props

    if (!isDragging) {
      return null
    }

    switch (itemType) {
      case canvasItemTypes.CANVAS_NODE:
        return (
          <svg style={layerStyles}>
            <g style={getItemStyles(this.props, item.zoomLevel)}>
              <CanvasNode
                node={item.node}
                foreignObjectSupport={item.foreignObjectSupport}
              />
            </g>
          </svg>
        )
      case canvasItemTypes.TOOLBOX_ITEM:
        return (
          <div className="canvas-toolbox" style={layerStyles}>
            <ul
              className="toolbox-items-list"
              style={getItemStyles(this.props)}
            >
              <li className={item.itemClass} style={getRotateStyles()}>
                {item.children}
              </li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }
}

export default DragLayer(collect)(CustomDragLayer)
