import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { compose, pure, withHandlers } from 'recompose'

import entityTypes from '@/lib/constants/entityTypes'
import modeTypes from '@/lib/constants/modeTypes'

import UserDataContainer from './user.dataContainer'

const handlers = {
  setEditRoute: props => node => {
    // NIY
  },

  onCanvasClick: props => () => {
    // NIY
    const { onCanvasClick } = props

    typeof onCanvasClick === 'function' && onCanvasClick()
  },

  onToolboxItemDrop: props => node => {
    // NIY
    const { onToolboxItemDrop } = props

    typeof onToolboxItemDrop === 'function' && onToolboxItemDrop(node)
  },

  onDeleteSelectedNode: props => node => {
    // NIY
  },

  onEditSelectedNode: props => node => {
    handlers.setEditRoute(props)(node)
  },

  onModechange: props => key => {
    // NIY
    const { onModechange } = props
    typeof onModechange === 'function' && onModechange(key)
  },

  onNodeAnchorClick: props => node => {
    const { currentMode, routes } = props
    const { placeViewRoute, userViewRoute } = routes

    switch (currentMode) {
      case modeTypes.DISCOVERY:
        if (node.type === entityTypes.PLACE) {
          placeViewRoute(node.name)
        } else if (node.type === entityTypes.PERSON) {
          userViewRoute(node.name)
        }
        break
    }
  },

  onNodeDelete: props => deletedNode => {
    // NIY
  },

  onNodeHeaderClick: props => node => {
    // NIY
  }
}

class UserContainer extends Component {
  render() {
    return <UserDataContainer {...this.props} />
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers(handlers),
  pure
)(UserContainer)
