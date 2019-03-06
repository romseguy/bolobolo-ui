import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'
import { actions as tooltipActions } from 'redux-tooltip'

import bindActionCreators from '@/lib/helpers/bindActionCreators'
import debug from '@/lib/helpers/debug'
import { getCanvasNodeAnchorTooltipName } from '@/lib/ui/helpers/tooltips'
import modeTypes from '@/lib/constants/modeTypes'
import sizeTypes from '@/lib/constants/sizeTypes'
import entityTypes from '@/lib/constants/entityTypes'

import {
  canvasActions,
  getCanvasNodes,
  getCanvasNodesLoading,
  getSelectedNodeIds
} from '@/core/canvas'
import {
  mapActions,
  getMapCenter,
  getMapNodes,
  getMapNodesLoading
} from '@/core/map'
import { routerActions } from '@/core/router'

import { CanvasManager } from '@/lib/ui/components/canvas'
import Icon from '@/lib/ui/components/icon'
import { Loader } from '@/lib/ui/components/layout'
import { MapManager } from '@/lib/ui/components/map'

import createModes from './createModes'
import createToolboxes from './createToolboxes'

/**
 * - handle window resize
 * - handle loading state
 * - render current route control (MapManager, CanvasManager, ...) with appropriate props
 * - render props control
 */
class MainPanelContainer extends Component {
  static getDimensions = function getDimensions(window) {
    const { currentBreakpoint, innerHeight: h, innerWidth: w } = window
    let mapHeight = h - 55
    let canvasHeight = h - 115
    let canvasWidth = w

    if (currentBreakpoint === sizeTypes.MOBILE) {
      mapHeight -= 49
      canvasHeight -= 60
    } else if (currentBreakpoint === sizeTypes.TABLET) {
      canvasWidth -= 30
    } else if (currentBreakpoint === sizeTypes.COMPUTER) {
      canvasWidth -= 30
    }

    return {
      canvasWidth,
      canvasHeight,
      mapHeight,
      mapWidth: w
    }
  }

  constructor(props) {
    super(props)
    const { routeType, t } = props
    let currentMode = modeTypes.DISCOVERY

    if (
      [routerActions.ME_PLACES_ADD, routerActions.ME_PLACE_EDIT].includes(
        routeType
      )
    ) {
      currentMode = modeTypes.EDIT
    }

    this.state = {
      currentMode,
      ...MainPanelContainer.getDimensions(window),
      modes: createModes(t),
      toolboxes: createToolboxes(currentMode, this.setToolboxIsOpen, t)
    }
  }

  componentDidMount() {
    this.setDimensions()
    window.addEventListener('resize', this.handleResize)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentLang !== nextProps.currentLang) {
      this.setState(p => ({
        toolboxes: createToolboxes(
          p.currentMode,
          this.setToolboxIsOpen,
          nextProps.t
        )
      }))
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  setCurrentMode = modeKey => {
    this.setState(p => ({
      currentMode: modeKey
    }))
  }

  setDimensions = () => {
    this.setState(p => MainPanelContainer.getDimensions(window))
  }

  setToolboxDisabled = (key, disabled) => {
    this.setState(p => ({
      toolboxes: p.toolboxes.map(toolbox => {
        if (toolbox.key === key) {
          return {
            ...toolbox,
            props: {
              ...toolbox.props,
              isOpen: false
            },
            buttonProps: {
              ...toolbox.buttonProps,
              disabled
            }
          }
        }
        return toolbox
      })
    }))
  }

  setToolboxIsOpen = (key, isOpen) => {
    this.setState(p => ({
      toolboxes: p.toolboxes.map(toolbox => {
        if (toolbox.key === key || key === '*') {
          const active = isOpen === undefined ? !toolbox.props.isOpen : isOpen
          return {
            ...toolbox,
            props: {
              ...toolbox.props,
              isOpen: active
            },
            buttonProps: {
              ...toolbox.buttonProps,
              active
            }
          }
        }

        return {
          ...toolbox,
          props: {
            ...toolbox.props,
            isOpen: false
          },
          buttonProps: {
            ...toolbox.buttonProps,
            active: false
          }
        }
      })
    }))
  }

  toggleNodeAnchorTooltip = node => {
    const { hideTooltip, showTooltip } = this.props
    const { currentMode } = this.state

    hideTooltip({ name: getCanvasNodeAnchorTooltipName(currentMode, node) })
    showTooltip({
      name: getCanvasNodeAnchorTooltipName(currentMode, {
        ...node,
        selected: !node.selected
      }),
      origin: `canvas-node__anchor-img-${node.id}`
    })
  }

  handleCanvasClick = () => {
    const { canvasActions } = this.props
    const { unselectNodes } = canvasActions
    unselectNodes()
    this.setToolboxIsOpen('*', false)
  }

  handleDeleteSelectedNode = node => {
    const { canvasActions } = this.props

    if (node.isNew) {
      canvasActions.removeNode(node)
    } else if (Object.keys(entityTypes).includes(node.type)) {
      canvasActions.deleteServerNode(node)
    }
  }

  handleMapClick = args => {
    debug('NIY: MainPanel.handleMapClick', args)
  }

  handleModeChange = modeKey => {
    const { canvasActions } = this.props
    const { unselectNodes } = canvasActions
    unselectNodes()

    this.setCurrentMode(modeKey)

    if (modeKey === modeTypes.DISCOVERY) {
      this.setToolboxDisabled('entities', true)
      this.setToolboxDisabled('symbols', true)
    } else if (modeKey === modeTypes.EDIT) {
      this.setToolboxDisabled('entities', false)
      this.setToolboxDisabled('symbols', false)
    }
  }

  handleNodeAnchorClick = node => {
    // NIY
  }

  handleNodeAnchorMouseOver = node => {
    const { canvasActions } = this.props
    const { hoverNode } = canvasActions
    hoverNode(true, node)
  }

  handleNodeAnchorMouseOut = node => {
    const { canvasActions } = this.props
    const { hoverNode } = canvasActions
    hoverNode(false, node)
  }

  handleNodeDragEnd = (node, x, y) => {
    let { canvasActions, nodes } = this.props
    const { setNodes } = canvasActions

    if (!nodes.length) {
      nodes = [node]
    }

    setNodes(
      nodes.map(n => {
        if (node.id === n.id) {
          return {
            ...n,
            x,
            y
          }
        }

        return n
      })
    )
  }

  handleResize = () => {
    this.setDimensions()
  }

  handleNodeHeaderClick = node => {
    // NIY
  }

  handleToolboxItemDrop = node => {
    const { canvasActions } = this.props
    const { addNode } = canvasActions
    addNode(node)
    this.setToolboxIsOpen('*', false)
  }

  render() {
    const { control, currentRoute, error, isLoading, loaded } = this.props

    const { mapHeight, mapWidth } = this.state

    if (isLoading || !loaded) {
      return (
        <div style={{ minHeight: mapHeight }}>
          <Loader
            active
            inline="centered"
            style={{
              position: 'absolute',
              top: mapHeight / 2,
              left: mapWidth / 2
            }}
          />
        </div>
      )
    }

    if (error) {
      return (
        <div
          style={{
            display: 'table-cell',
            height: mapHeight,
            textAlign: 'center',
            verticalAlign: 'middle',
            width: mapWidth
          }}
        >
          <h1>
            <Icon name="parrot" height={32} /> 404
          </h1>
          <p>{error}.</p>
        </div>
      )
    }

    let controlEl = null

    if (control) {
      controlEl = React.createElement(control, {
        ...this.props,
        height: mapHeight
      })
    }

    if (currentRoute.control === MapManager) {
      controlEl = React.createElement(currentRoute.container, {
        ...this.props,
        ...this.state,
        control: currentRoute.control,
        toggleNodeAnchorTooltip: this.toggleNodeAnchorTooltip,
        onMapClick: this.handleMapClick,
        onNodeAnchorClick: this.handleNodeAnchorClick,
        onNodeHeaderClick: this.handleNodeHeaderClick
      })
    } else if (currentRoute.control === CanvasManager) {
      controlEl = React.createElement(currentRoute.container, {
        ...this.props,
        ...this.state,
        control: currentRoute.control,
        toggleNodeAnchorTooltip: this.toggleNodeAnchorTooltip,
        onCanvasClick: this.handleCanvasClick,
        onDeleteSelectedNode: this.handleDeleteSelectedNode,
        onModeChange: this.handleModeChange,
        onNodeAnchorClick: this.handleNodeAnchorClick,
        onNodeAnchorMouseOver: this.handleNodeAnchorMouseOver,
        onNodeAnchorMouseOut: this.handleNodeAnchorMouseOut,
        onNodeDragEnd: this.handleNodeDragEnd,
        onNodeHeaderClick: this.handleNodeHeaderClick,
        onToolboxItemDrop: this.handleToolboxItemDrop
      })
    }

    return controlEl
  }
}

const mapStateToProps = (state, { currentRoute, routeType }) => {
  const props = {
    loaded: true
  }

  if (currentRoute.control === MapManager) {
    const center = getMapCenter(state)
    const nodes = getMapNodes(state)
    const nodesLoading = getMapNodesLoading(state)

    props.loaded = props.loaded && !nodesLoading && center !== null

    if (!nodesLoading) {
      props.nodes = nodes
    }

    if (center) {
      props.center = center
    }
  } else if (currentRoute.control === CanvasManager) {
    const nodes = getCanvasNodes(state)
    const nodesLoading = getCanvasNodesLoading(state)
    const selectedNodeIds = getSelectedNodeIds(state)

    props.loaded = props.loaded && !nodesLoading

    if (!nodesLoading) {
      props.nodes = nodes

      if (selectedNodeIds.length > 0) {
        props.selectedNodeIds = selectedNodeIds

        if (selectedNodeIds.length === 1) {
          props.selectedNode = nodes.find(
            node => node.id === selectedNodeIds[0]
          )
        }
      }
    }
  }

  return props
}

const mapDispatchToProps = (dispatch, { routeType }) => {
  const actions = {
    hideTooltip: bindActionCreators(tooltipActions.hide, dispatch),
    showTooltip: bindActionCreators(tooltipActions.show, dispatch)
  }

  // control is a map
  if ([routerActions.ROOT].includes(routeType)) {
    actions.mapActions = bindActionCreators(mapActions, dispatch)
  }
  // control is a canvas
  else {
    actions.canvasActions = bindActionCreators(canvasActions, dispatch)
  }

  return actions
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
)(MainPanelContainer)
