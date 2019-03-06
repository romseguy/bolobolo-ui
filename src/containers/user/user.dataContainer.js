import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, pure, withHandlers } from 'recompose'
import debug from '@/lib/helpers/debug'
import modeTypes from '../../lib/constants/modeTypes'
import userQuery from '@/lib/graphql/queries/user.query.graphql'

class UserDataContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { isLoading, myPlaces, routes } = nextProps

    if (!isLoading) {
      if (!myPlaces) {
        debug('user 404')
        routes.notFoundRoute()
      }
    }
  }

  render() {
    const { control, currentMode, modes, t, ...props } = this.props

    return React.createElement(control, {
      ...props,
      currentMode,
      modes: modes.map(mode => {
        if (mode.key === modeTypes.EDIT) {
          return { ...mode, disabled: true }
        }
        return mode
      }),
      readOnly: currentMode !== modeTypes.EDIT,
      t
    })
  }
}

const userQueryConfig = {
  options: props => {
    return {
      variables: {
        username: props.routePayload.username
      }
    }
  },
  props({ data, ownProps }) {
    const { loading, myPlaces } = data

    const { isLoading = false } = ownProps

    const props = {
      isLoading: isLoading || loading
    }

    if (!loading && myPlaces) {
      props.myPlaces = myPlaces
    }

    return props
  }
}

export default compose(
  graphql(userQuery, userQueryConfig),
  pure
)(UserDataContainer)
