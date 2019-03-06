import './canvas.scss'

import { debounce } from 'lodash-es'
import React from 'react'
import { DropTarget } from 'react-dnd'
import cx from 'classnames'

import invert from '@/lib/ui/helpers/invert'
import getClientPosition from '@/lib/ui/helpers/getClientPosition'
import canvasItemTypes from '@/lib/constants/canvasItemTypes'

import DraggableCanvasNode from './draggableCanvasNode'
import { pan, zoom } from './canvasUtils'

class Canvas extends React.Component {
  constructor(props) {
    super(props)
    const { zoomLevel, onWheel } = props
    this.state = {
      dragging: false,
      foreignObjectSupport: document.implementation.hasFeature(
        'www.http://w3.org/TR/SVG11/feature#Extensibility',
        '1.1'
      ),
      matrix: [zoomLevel, 0, 0, zoomLevel, 0, 0],
      zoomLevel
    }
    this.onWheel = debounce(onWheel, 200)
  }

  handleWheel = ({ deltaX, deltaY }) => {
    this.onWheel({ deltaX, deltaY })
  }

  setSvgReference = ref => {
    if (ref) {
      this.props.setSvgReference(ref)
      this.svg = ref
    }
  }

  componentWillReceiveProps({ zoomLevel }) {
    if (zoomLevel !== this.state.zoomLevel) {
      this.setState({
        matrix: zoom(this.state.matrix, zoomLevel),
        zoomLevel
      })
    }
  }

  onDragStart = e => {
    e.preventDefault()

    if (e.target !== this.svg) {
      return
    }

    const { clientX, clientY } = getClientPosition(e)

    this.setState({
      dragging: true,
      startX: clientX,
      startY: clientY
    })
  }

  onDragMove = e => {
    e.preventDefault()

    // First check if the state is dragging, if not we can just return
    // so we do not move unless the user wants to move
    if (!this.state.dragging) {
      return
    }

    const { clientX, clientY } = getClientPosition(e)

    // Take the delta where we are minus where we came from
    const dx = clientX - this.state.startX
    const dy = clientY - this.state.startY

    // Update the new startX and startY position
    // because a drag is likely a continuous movement
    this.setState({
      matrix: pan(this.state.matrix, dx, dy),
      startX: clientX,
      startY: clientY
    })
  }

  onDragEnd = e => {
    this.setState({
      dragging: false
    })
  }

  render() {
    const {
      canvasClass = 'canvas',
      canvasHeight = 756,
      canvasWidth = 1396,
      connectDropTarget,
      currentMode,
      nodes = [],
      readOnly = false,
      toolboxes,
      zoomLevel,
      onClick,
      onNodeAnchorClick,
      onNodeAnchorMouseOver,
      onNodeAnchorMouseOut,
      onNodeHeaderClick
    } = this.props

    const svgClasses = cx(canvasClass, {
      [`${canvasClass}--dragging`]: this.state.dragging,
      [`${canvasClass}--readonly`]: readOnly
    })

    const svg = (
      <svg
        ref={ref => this.setSvgReference(ref)}
        className={svgClasses}
        height={canvasHeight}
        width={canvasWidth}
        onClick={onClick}
        onMouseDown={this.onDragStart}
        onTouchStart={this.onDragStart}
        onMouseMove={this.onDragMove}
        onTouchMove={this.onDragMove}
        onMouseUp={this.onDragEnd}
        onTouchEnd={this.onDragEnd}
        onWheel={this.handleWheel}
      >
        <g transform={`matrix(${this.state.matrix.join(' ')})`}>
          {nodes.map(node => {
            return (
              <DraggableCanvasNode
                node={node}
                currentMode={currentMode}
                foreignObjectSupport={this.state.foreignObjectSupport}
                readOnly={readOnly}
                zoomLevel={zoomLevel}
                onAnchorClick={onNodeAnchorClick}
                onAnchorMouseOver={onNodeAnchorMouseOver}
                onAnchorMouseOut={onNodeAnchorMouseOut}
                onHeaderClick={onNodeHeaderClick}
                key={`canvas-node-${node.id}`}
              />
            )
          })}
        </g>
      </svg>
    )

    return (
      <div style={{ position: 'relative' }}>
        {toolboxes.map(toolbox =>
          React.createElement(toolbox.component, toolbox.props)
        )}
        <div>{connectDropTarget(svg)}</div>
      </div>
    )
  }
}

//=====================================
//  DND
//-------------------------------------

const dropItemTypes = props => {
  return props.canvasDropItemTypes || []
}

const dropCanvasSpec = {
  drop(props, monitor, component) {
    const item = monitor.getItem()
    const itemType = monitor.getItemType()
    const delta = monitor.getDifferenceFromInitialOffset()
    const initial = monitor.getInitialClientOffset()
    const { matrix, zoomLevel } = component.state
    const { onToolboxItemDrop, onNodeDragEnd } = component.props

    if (itemType === canvasItemTypes.CANVAS_NODE) {
      const x = Math.round(item.node.x + delta.x / zoomLevel)
      const y = Math.round(item.node.y + delta.y / zoomLevel)
      onNodeDragEnd(item.node, x, y)
    } else if (itemType === canvasItemTypes.TOOLBOX_ITEM) {
      const canvasPosition = component.svg.getBoundingClientRect()
      const x =
        (invert(matrix[4]) +
          delta.x +
          initial.x -
          canvasPosition.left -
          item.itemAttributes.width / 1.8) /
        zoomLevel
      const y =
        (invert(matrix[5]) +
          delta.y +
          initial.y -
          canvasPosition.top -
          item.itemAttributes.height / 1.8) /
        zoomLevel
      onToolboxItemDrop(item, x, y)
    }
  },

  canDrop(props, monitor) {
    const { x, y } = monitor.getClientOffset()
    // todo: check if x, y isn't within another node bounding rect
    return true
  }
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType()
})

export default DropTarget(dropItemTypes, dropCanvasSpec, collect)(Canvas)
