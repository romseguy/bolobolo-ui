import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, pure, withHandlers } from 'recompose'

import entityTypes from '@/lib/constants/entityTypes'
import modeTypes from '@/lib/constants/modeTypes'
import symbolTypes from '@/lib/constants/symbolTypes'

import { routerActions } from '@/core/router'

import updateUserPlacesMutation from '@/lib/graphql/mutations/updateUserPlaces.mutation.graphql'
// todo: import updateUserUsersMutation from '@/lib/graphql/mutations/updateUserUsersMutation.graphql'

const handlers = {
  setCreateRoute: props => node => {
    const { routes } = props
    const { mePlacesAddRoute, meSymbolsAddRoute, meUsersAddRoute } = routes

    if (node.type === entityTypes.PLACE) {
      mePlacesAddRoute()
    } else if (node.type === entityTypes.PERSON) {
      meUsersAddRoute()
    } else if (symbolTypes[node.type]) {
      meSymbolsAddRoute()
    }
  },

  setEditRoute: props => node => {
    const { routes } = props
    const { mePlaceEditRoute, meSymbolEditRoute, meUserEditRoute } = routes

    if (node.type === entityTypes.PLACE) {
      mePlaceEditRoute(node.name)
    } else if (node.type === entityTypes.PERSON) {
      meUserEditRoute(node.name)
    } else if (symbolTypes[node.type]) {
      meSymbolEditRoute(node.name)
    }
  },

  onCanvasClick: props => () => {
    const { routes, routeType, onCanvasClick } = props
    const { meRoute } = routes

    if (routeType !== routerActions.ME) {
      meRoute()
    }

    typeof onCanvasClick === 'function' && onCanvasClick()
  },

  onDeleteSelectedNode: props => node => {
    const { onDeleteSelectedNode } = props

    typeof onDeleteSelectedNode === 'function' && onDeleteSelectedNode(node)
  },

  onDetailsClick: props => node => {
    alert('todo: my profile details panel')
    // todo: CanvasManager.displaySidePanel=true
  },

  onEditSelectedNode: props => node => {
    if (node.isNew) {
      handlers.setCreateRoute(props)(node)
    } else {
      handlers.setEditRoute(props)(node)
    }
  },

  onModeChange: props => async key => {
    const { doUpdateUserPlaces, nodes, routes, routeType, onModeChange } = props
    const { meRoute } = routes

    if (routeType !== routerActions.ME) {
      meRoute()
    }

    doUpdateUserPlaces({ nodes })

    typeof onModeChange === 'function' && onModeChange(key)
  },

  onNodeAnchorClick: props => node => {
    const {
      canvasActions,
      currentMode,
      hideTooltip,
      routes,
      showTooltip,
      toggleNodeAnchorTooltip,
      onNodeAnchorClick
    } = props
    const { selectNode } = canvasActions
    const { placeViewRoute } = routes

    switch (currentMode) {
      case modeTypes.DISCOVERY:
        if (node.type === entityTypes.PLACE) {
          placeViewRoute(node.name)
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
    const { canvasActions, currentMode } = props
    const { selectNode } = canvasActions

    if (!node.mine) {
      return
    }

    switch (currentMode) {
      case modeTypes.EDIT:
        selectNode(true, node)

        if (node.isNew) {
          handlers.setCreateRoute(props)(node)
        } else {
          handlers.setEditRoute(props)(node)
        }
        break
    }
  },

  onToolboxItemDrop: props => node => {
    const { canvasActions, routes, onToolboxItemDrop } = props
    const { selectNode } = canvasActions
    const { mePlacesAddRoute, meSymbolsAddRoute, meUsersAddRoute } = routes
    const { type } = node

    selectNode(true, node)

    if (type === entityTypes.PLACE) {
      mePlacesAddRoute()
    } else if (type === entityTypes.PERSON) {
      meUsersAddRoute()
    } else if (symbolTypes[type]) {
      meSymbolsAddRoute(type)
    }

    typeof onToolboxItemDrop === 'function' && onToolboxItemDrop(node)
  }
}

class MeContainer extends Component {
  render() {
    const { control, currentMode, t, ...props } = this.props

    return React.createElement(control, {
      ...props,
      currentMode,
      readOnly: currentMode !== modeTypes.EDIT,
      t
    })
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {}

const updateUserPlacesMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doUpdateUserPlaces({ nodes }) {
        const userPlaces = nodes
          .filter(node => node.type === entityTypes.PLACE && !node.isNew)
          .map(({ idServer, x, y }) => ({
            placeId: Number(idServer),
            x: parseFloat(x),
            y: parseFloat(y)
          }))

        return mutate({
          variables: {
            userPlaces
          }
        })
      }
    }
  }
}

/* todo:
 const updateUserUsersMutationConfig = {
 props({ownProps, mutate}) {
 return {
 doUpdateUserUsers({nodes}){
 const userUsers = nodes
 .filter(node => node.type === entityTypes.PERSON && !node.isNew)
 .map(({idServer, x, y}) => ({
 userId: Number(idServer),
 x: parseFloat(x),
 y: parseFloat(y)
 }))

 return mutate({
 variables: {
 userUsers
 },
 })
 }
 }
 }
 }
 */

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(updateUserPlacesMutation, updateUserPlacesMutationConfig),
  // todo: graphql(updateUserUsersMutation, updateUserUsersMutationConfig)
  withHandlers(handlers),
  pure
)(MeContainer)
