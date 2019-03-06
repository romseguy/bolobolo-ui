import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import { compose, pure, withState } from 'recompose'
import roleTypes from '@/lib/constants/roleTypes'
import { routerActions } from '@/core/router'
import SymbolForm from '@/lib/ui/components/symbolForm'
import myPlaceQuery from '@/lib/graphql/queries/myPlace.query.graphql'

class SymbolFormDataContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const {
      currentRoute,
      isLoading,
      myPlace,
      routePayload,
      routes,
      routeType
    } = nextProps

    if (!isLoading) {
      if (
        [
          routerActions.PLACE_SYMBOLS_ADD,
          routerActions.PLACE_SYMBOL_EDIT
        ].includes(routeType)
      ) {
        if (!myPlace) {
          routes.notFoundRoute()
        } else if (
          !currentRoute.allowedSymbolTypes.includes(
            routePayload.symbolType.toUpperCase()
          )
        ) {
          routes.notFoundRoute()
        }
      }
    }
  }

  render() {
    const { isLoading, routePayload, ...props } = this.props

    const { ...state } = this.state

    let prefix

    if (!isLoading) {
      prefix = `form:symbol.${routePayload.symbolType.toLowerCase()}`
    }

    return (
      <SymbolForm
        {...props}
        {...state}
        isLoading={isLoading}
        prefix={prefix}
        setIsScriptLoading={this.setIsScriptLoading}
      />
    )
  }
}

const myPlaceQueryConfig = {
  skip: props => {
    if (!props.routePayload.placeTitle) {
      return true
    }

    return false
  },
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
      isLoading: isLoading || loading,
      myPlace: null
    }

    if (!loading && myPlace) {
      props.mine = myPlace.role.id === roleTypes.GUARDIAN
      props.myPlace = myPlace
    }

    return props
  }
}

export default compose(
  withState('isScriptLoading', 'setIsScriptLoading', false),
  graphql(myPlaceQuery, myPlaceQueryConfig),
  pure
)(SymbolFormDataContainer)
