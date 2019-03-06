import React from 'react'
import { translate } from 'react-i18next'
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

import About from '@/lib/ui/components/about'
import Tutorial from '@/lib/ui/components/tutorial'
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

  render() {
    const {
      currentRoute = {},
      currentUser,
      prevRouteType,
      prevRoute = {},
      t
    } = this.props

    let { routeType } = this.props

    const routeProps = { ...this.props, ...this.state }

    // exit cases
    if (routeType === routerActions.LOGOUT) {
      return null
    } else if (routeType === NOT_FOUND) {
      return <MainPanelContainer {...routeProps} error={t('not_found')} />
    } else if (routeType === routerActions.AUTH) {
      if (prevRoute.requiresAuth === false) {
        routeType = prevRouteType
      } else {
        routeType = routerActions.ROOT
      }
    } else if (currentRoute.requiresAuth !== false && !currentUser) {
      return <Loader indeterminate />
    }

    // standalone
    let control = null

    if (routeType === routerActions.ABOUT) {
      control = About
    } else if (routeType === routerActions.TUTORIAL) {
      control = <Tutorial {...routeProps} routes={routerActions} />
    }

    // optional SidePanel
    let sidePanelEl = null

    if (
      [routerActions.ME_PLACES_ADD, routerActions.ME_PLACE_EDIT].includes(
        routeType
      )
    ) {
      sidePanelEl = <PlaceFormContainer {...routeProps} routeType={routeType} />
    } else if (
      [
        routerActions.ME_SYMBOLS_ADD,
        routerActions.ME_SYMBOL_EDIT,
        routerActions.PLACE_SYMBOLS_ADD
      ].includes(routeType)
    ) {
      sidePanelEl = <SymbolFormContainer {...routeProps} />
    } else if (
      [routerActions.ME_USERS_ADD, routerActions.ME_USER_EDIT].includes(
        routeType
      )
    ) {
      sidePanelEl = <UserFormContainer {...routeProps} />
    }

    // MainPanel
    return (
      <div>
        <MainPanelContainer
          {...routeProps}
          control={control}
          currentRoute={routes[routeType]}
          routeType={routeType}
        />
        {sidePanelEl && <SidePanel>{sidePanelEl}</SidePanel>}
      </div>
    )
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
  translate(),
  connect(mapStateToProps),
  pure
)(RouterContainer)
