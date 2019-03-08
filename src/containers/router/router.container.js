import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, pure, withState } from 'recompose'
import { NOT_FOUND } from 'redux-first-router'
import routes from '@/routes'

import {
  routerActions,
  getPayload,
  getPrevRouteType,
  getRouteType
} from '@/core/router'
import { getLang } from '@/core/settings'

import MainPanelContainer from '@/containers/mainPanel'
import PlaceFormContainer from '@/containers/placeForm'
import SymbolFormContainer from '@/containers/symbolForm'
import UserFormContainer from '@/containers/userForm'

import { CanvasManager } from '@/lib/ui/components/canvas'
import { MapManager } from '@/lib/ui/components/map'
import { Loader } from '@/lib/ui/components/layout'
import SidePanel from '@/lib/ui/components/sidePanel'

class RouterContainer extends React.Component {
  state = {
    isLoading: false
  }

  componentDidUpdate(/*prevProps, prevState*/) {
    this.setIsLoading(false)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.routeType !== nextProps.routeType) {
      this.setIsLoading(true)
    }
  }

  setIsLoading(isLoading) {
    if (this.state.isLoading !== isLoading) {
      this.setState(p => ({ isLoading }))
    }
  }

  renderSidePanel(routeType) {
    let sidePanel = null

    if (
      [routerActions.ME_PLACES_ADD, routerActions.ME_PLACE_EDIT].includes(
        routeType
      )
    ) {
      sidePanel = <PlaceFormContainer {...routeProps} routeType={routeType} />
    } else if (
      [
        routerActions.ME_SYMBOLS_ADD,
        routerActions.ME_SYMBOL_EDIT,
        routerActions.PLACE_SYMBOLS_ADD
      ].includes(routeType)
    ) {
      sidePanel = <SymbolFormContainer {...routeProps} />
    } else if (
      [routerActions.ME_USERS_ADD, routerActions.ME_USER_EDIT].includes(
        routeType
      )
    ) {
      sidePanel = <UserFormContainer {...routeProps} />
    }

    if (!sidePanel) {
      return null
    }

    return <SidePanel>{sidePanel}</SidePanel>
  }

  render() {
    const {
      currentRoute = {},
      currentUser,
      prevRouteType,
      prevRoute = {}
    } = this.props

    let { routeType } = this.props

    const routeProps = { ...this.props, ...this.state }

    // early exit cases
    if (routeType === routerActions.LOGOUT) {
      return null
    } else if (routeType === routerActions.AUTH) {
      if (prevRoute.requiresAuth === false) {
        routeType = prevRouteType
      } else {
        routeType = routerActions.ROOT
      }
    } else if (currentRoute.requiresAuth !== false && !currentUser) {
      return <Loader indeterminate />
    }

    if (
      currentRoute.control === MapManager ||
      currentRoute.control === CanvasManager
    ) {
      return (
        <>
          <MainPanelContainer
            {...routeProps}
            control={control}
            currentRoute={routes[routeType]}
            routeType={routeType}
          />
          {this.renderSidePanel(routeType)}
        </>
      )
    } else {
      return (
        <>
          <currentRoute.control {...routeProps} routes={routerActions} />
          {this.renderSidePanel(routeType)}
        </>
      )
    }
  }
}

const mapStateToProps = state => {
  const prevRouteType = getPrevRouteType(state)
  const prevRoute = routes[prevRouteType]
  const routeType = getRouteType(state)
  const routePayload = getPayload(state)
  const currentRoute = routes[routeType]
  const currentLang = getLang(state)

  return {
    currentLang,
    currentRoute,
    prevRoute,
    prevRouteType,
    routePayload,
    routeType
  }
}

export default compose(
  withTranslation(),
  connect(mapStateToProps),
  pure
)(RouterContainer)
