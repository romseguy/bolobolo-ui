import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose, pure, withHandlers } from 'recompose'

const handlers = {
  onBoundsChange: props => data => {
    const { center, zoom, bounds, initial } = data
    const { mapActions } = props

    if (Array.isArray(center) && center.length === 2) {
      mapActions.setCenter(center)
    }
  },

  onNodeAnchorClick: props => node => {
    const { routes } = props
    const { placeViewRoute } = routes

    placeViewRoute(node.name)
  }
}

class PlacesContainer extends Component {
  render() {
    const { control, ...props } = this.props

    return React.createElement(control, {
      ...props
    })
  }
}

const mapStateToProps = state => {
  return {}
}

export default compose(
  connect(mapStateToProps),
  withHandlers(handlers),
  pure
)(PlacesContainer)
