import React from 'react'
import { graphql } from 'react-apollo'
import { compose, pure, withHandlers } from 'recompose'
import debug from '@/lib/helpers/debug'
import modeTypes from '@/lib/constants/modeTypes'
import roleTypes from '@/lib/constants/roleTypes'
import myPlaceQuery from '@/lib/graphql/queries/myPlace.query.graphql'

class PlaceDataContainer extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { isLoading, myPlace, routes } = nextProps

    if (!isLoading) {
      if (!myPlace) {
        debug('place 404')
        routes.notFoundRoute()
      }
    }
  }

  render() {
    const {
      control,
      currentMode,
      mine,
      modes,
      routePayload,
      t,
      ...rest
    } = this.props

    return React.createElement(control, {
      ...rest,
      currentMode,
      modes: modes.map(mode => {
        if (mode.key === modeTypes.EDIT) {
          return { ...mode, disabled: !mine }
        }
        return mode
      }),
      readOnly: currentMode !== modeTypes.EDIT,
      t
    })
  }
}

const myPlaceQueryConfig = {
  options: props => {
    return {
      variables: {
        title: props.routePayload.placeTitle
      }
    }
  },
  props({ data, ownProps }) {
    const { myPlace, loading } = data

    const { isLoading = false } = ownProps

    const props = {
      isLoading: isLoading || loading
    }

    if (!loading && myPlace) {
      props.mine = myPlace.role.id === roleTypes.GUARDIAN
      props.myPlace = myPlace
    }

    return props
  }
}

export default compose(
  graphql(myPlaceQuery, myPlaceQueryConfig),
  pure
)(PlaceDataContainer)
