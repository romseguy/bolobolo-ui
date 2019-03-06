import React, { Component } from 'react'
import { compose, withHandlers } from 'recompose'

import withDragDropContext from '@/lib/ui/helpers/decorators/withDragDropContext'
import canvasItemTypes from '@/lib/constants/canvasItemTypes'

import Toolbar from '@/lib/ui/components/toolbar'
import {
  CanvasTooltips,
  ToolboxTooltips
} from '@/lib/ui/components/tooltips'

import Canvas from './canvas'
import CanvasLayout from './canvasLayout'
import CustomDragLayer from './customDragLayer'

const canvasDropItemTypes = [
  canvasItemTypes.CANVAS_NODE,
  canvasItemTypes.TOOLBOX_ITEM
]

const handlers = {
  // CANVAS
  onNodeAnchorClick: props => node => {
    const { onNodeAnchorClick } = props
    typeof onNodeAnchorClick === 'function' && onNodeAnchorClick(node)
  },
  onNodeAnchorMouseOut: props => node => {
    const { onNodeAnchorMouseOut } = props
    typeof onNodeAnchorMouseOut === 'function' && onNodeAnchorMouseOut(node)
  },
  onNodeAnchorMouseOver: props => node => {
    const { onNodeAnchorMouseOver } = props
    typeof onNodeAnchorMouseOver === 'function' && onNodeAnchorMouseOver(node)
  },
  onNodeDragEnd: props => (node, x, y) => {
    const { onNodeDragEnd } = props
    typeof onNodeDragEnd === 'function' && onNodeDragEnd(node, x, y)
  },
  onNodeHeaderClick: props => node => {
    const { onNodeHeaderClick } = props
    typeof onNodeHeaderClick === 'function' && onNodeHeaderClick(node)
  },
  onToolboxItemDrop: props => (item, x, y) => {
    const { nodes, onToolboxItemDrop } = props

    const node = {
      ...item.itemAttributes,
      height: item.itemAttributes.height + 50,
      id: nodes.length,
      selected: true,
      x,
      y
    }

    typeof onToolboxItemDrop === 'function' && onToolboxItemDrop(node)
  },

  // TOOLBAR
  onToolbarDeleteClick: props => node => {
    const { onDeleteSelectedNode } = props
    typeof onDeleteSelectedNode === 'function' && onDeleteSelectedNode(node)
  },
  onToolbarDetailsClick: props => node => {
    const { onDetailsClick } = props
    typeof onDetailsClick === 'function' && onDetailsClick(node)
  },
  onToolbarEditClick: props => node => {
    const { onEditSelectedNode } = props
    typeof onEditSelectedNode === 'function' && onEditSelectedNode(node)
  },
  onToolbarModeClick: props => key => {
    const { currentMode, onModeChange } = props

    if (currentMode !== key) {
      typeof onModeChange === 'function' && onModeChange(key)
    }
  }
}

class CanvasManager extends Component {
  constructor(props) {
    super(props)

    const {
      maxZoom = 1,
      minZoom = parseFloat('.5'),
      zoomIncrement = parseFloat('.25'),
      zoomLevel = 1,
      zoomInDisabled = true,
      zoomOutDisabled = false
    } = props

    this.state = {
      maxZoom,
      minZoom,
      zoomIncrement,
      zoomInDisabled,
      zoomLevel,
      zoomOutDisabled
    }
  }

  setSvgReference = ref => {
    if (ref) {
      this.svg = ref
    }
  }

  // STATE TRANSITIONS
  zoomIn = () => {
    this.setState(p => {
      const level = (p.zoomLevel * 10 + p.zoomIncrement * 10) / 10

      return {
        zoomLevel: level,
        zoomInDisabled: level === p.maxZoom,
        zoomOutDisabled: false
      }
    })
  }

  zoomOut = () => {
    this.setState(p => {
      const level = (p.zoomLevel * 10 - p.zoomIncrement * 10) / 10

      return {
        zoomLevel: level,
        zoomInDisabled: false,
        zoomOutDisabled: level === p.minZoom
      }
    })
  }

  // CANVAS
  handleClick = e => {
    const { onCanvasClick } = this.props

    if (e.target === this.svg) {
      typeof onCanvasClick === 'function' && onCanvasClick(e)
    }
  }

  handleWheel = ({ deltaX, deltaY }) => {
    const { maxZoom, minZoom, zoomLevel } = this.state

    if (deltaY > 0 && zoomLevel > minZoom) {
      this.zoomOut()
    } else if (zoomLevel < maxZoom) {
      this.zoomIn()
    }
  }

  // TOOLBAR
  handleToolbarZoomInClick = () => {
    this.zoomIn()
  }

  handleToolbarZoomOutClick = () => {
    this.zoomOut()
  }

  render() {
    const {
      readOnly,
      selectedNode,
      selectedNodeIds = [],
      t,
      ...rest
    } = this.props

    const { zoomLevel, zoomOutDisabled, zoomInDisabled } = this.state

    return (
      <CanvasLayout>
        <CanvasTooltips t={t} />
        <ToolboxTooltips t={t} />

        <Toolbar
          {...rest}
          deleteDisabled={selectedNodeIds.length !== 1 || readOnly}
          editDisabled={!selectedNode || !selectedNode.mine || readOnly}
          selectedNode={selectedNode}
          t={t}
          zoomInDisabled={zoomInDisabled}
          zoomOutDisabled={zoomOutDisabled}
          onZoomInClick={this.handleToolbarZoomInClick}
          onZoomOutClick={this.handleToolbarZoomOutClick}
        />

        <CustomDragLayer />

        <Canvas
          {...rest}
          canvasDropItemTypes={canvasDropItemTypes}
          readOnly={readOnly}
          setSvgReference={this.setSvgReference}
          zoomLevel={zoomLevel}
          onClick={this.handleClick}
          onWheel={this.handleWheel}
        />
      </CanvasLayout>
    )
  }
}

export default compose(
  withHandlers(handlers),
  withDragDropContext
)(CanvasManager)
