import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, pure, withHandlers } from 'recompose'

import entityTypes from '@/lib/constants/entityTypes'
import modeTypes from '@/lib/constants/modeTypes'

import { routerActions } from '@/core/router'

import PlaceDataContainer from './place.dataContainer'

const handlers = {
  setCreateRoute: props => node => {
    // NIY
  },

  setEditRoute: props => node => {
    // NIY
  },

  onCanvasClick: props => () => {
    const { routes, routePayload, routeType, onCanvasClick } = props
    const { placeViewRoute } = routes

    if (routeType !== routerActions.PLACE_VIEW) {
      placeViewRoute(routePayload.placeTitle)
    }

    typeof onCanvasClick === 'function' && onCanvasClick()
  },

  onToolboxItemDrop: props => node => {
    const { routePayload, routes, onToolboxItemDrop } = props
    const { placeSymbolsAddRoute } = routes

    placeSymbolsAddRoute(routePayload.placeTitle, node.type.toLowerCase())

    typeof onToolboxItemDrop === 'function' && onToolboxItemDrop(node)
  },

  onDeleteSelectedNode: props => node => {
    // NIY
    // todo: delete place_place relation if deletedNode.type === LOCATION
  },

  onDetailsClick: props => node => {
    alert('todo: place details panel')
    // todo: CanvasManager.displaySidePanel=true
  },

  onEditSelectedNode: props => node => {
    handlers.setEditRoute(props)(node)
  },

  onModeChange: props => key => {
    const { nodes, routePayload, routes, onModeChange } = props

    /*    Promise.all([
      // todo: doUpdatePlacePlaces({nodes})
      // todo: doUpdatePlaceUsers({nodes})
    ])*/

    typeof onModeChange === 'function' && onModeChange(key)
  },

  onNodeAnchorClick: props => node => {
    const {
      canvasActions,
      currentMode,
      currentUser,
      routes,
      toggleNodeAnchorTooltip,
      onNodeAnchorClick
    } = props
    const { selectNode } = canvasActions
    const { meRoute, placeViewRoute, userViewRoute } = routes

    switch (currentMode) {
      case modeTypes.DISCOVERY:
        if (node.type === entityTypes.PLACE) {
          placeViewRoute(node.name)
        } else if (node.type === entityTypes.PERSON) {
          if (node.name === currentUser.username) {
            meRoute()
          } else {
            userViewRoute(node.name)
          }
        }
        break

      case modeTypes.EDIT:
        toggleNodeAnchorTooltip(node)

        if (node.selected) {
          selectNode(false, node)
        } else {
          selectNode(true, node)
        }
        break
    }

    typeof onNodeAnchorClick === 'function' && onNodeAnchorClick(node)
  },

  onNodeHeaderClick: props => node => {
    // NIY
  }
}

function PlaceContainer(props) {
  return <PlaceDataContainer {...props} />
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers(handlers),
  pure
)(PlaceContainer)
