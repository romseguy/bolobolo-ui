import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { withTranslation } from 'react-i18next'
import { graphql } from 'react-apollo'
import { compose, getContext, pure, withHandlers } from 'recompose'
import { change } from 'redux-form'
import { connect } from 'react-redux'

import { query } from '@/lib/helpers/apollo'
import geo from '@/lib/api/geo'
import { getGeocodedLocation, getGeocodedDepartment } from '@/lib/api/geo'
import modalTypes from '@/lib/constants/modalTypes'
import sizeTypes from '@/lib/constants/sizeTypes'

import { mapActions } from '@/core/map'
import { modalActions } from '@/core/modal'
import { routerActions, getPayload, getRouteType } from '@/core/router'
import {
  settingsActions,
  getCity,
  getDepartment,
  getTitle,
  getUserLocation
} from '@/core/settings'

import placeQuery from '@/lib/graphql/queries/place.query.graphql'
import logoutMutation from '@/lib/graphql/mutations/logout.mutation.graphql'

import Icon from '@/lib/ui/components/icon'
import { Grid, NoPadCol as Col } from '@/lib/ui/components/layout'
import {
  HeaderDropdown,
  HeaderGrid,
  HeaderLink,
  HeaderLinkRaw,
  HeaderTitle
} from '@/lib/ui/components/header'

const handlers = {
  onLocationIconClick: props => async event => {
    const {
      client,
      routePayload,
      routes,
      routeType,
      setCenter,
      userLocation,
      onLocationIconClick
    } = props

    if ([routerActions.ROOT].includes(routeType)) {
      setCenter([userLocation.lat, userLocation.lng])
      typeof onLocationIconClick === 'function' && onLocationIconClick()
    } else if (
      [routerActions.PLACE_VIEW].includes(routeType) &&
      routePayload.placeTitle
    ) {
      const { place } = await query(
        client,
        {
          query: placeQuery,
          variables: { title: routePayload.placeTitle }
        },
        {
          cache: true,
          from: 'handleLocationIconClick'
        }
      )

      setCenter([place.latitude, place.longitude])
      routes.homeRoute()
    } else {
      setCenter([userLocation.lat, userLocation.lng])
      routes.homeRoute()
    }
  },

  onTitleClick: props => event => {
    const {
      change,
      routeType,
      setCity,
      setDepartment,
      setLocation,
      setCenter,
      setModal,
      t,
      userLocation
    } = props

    if ([routerActions.ROOT].includes(routeType)) {
      const modalComponentProps = {
        center: [userLocation.lat, userLocation.lng],
        title: t('form:setLocation.header'),
        onSubmit: async function handleSetLocationFormSubmit(values, onClose) {
          let { city, department, marker } = values
          let geocodingResult = null

          if (!marker) {
            geocodingResult = await geo.geocodeCity(city)

            const { lat, lng } = getGeocodedLocation(geocodingResult)
            marker = [lat, lng]
          }

          if (!department) {
            if (!geocodingResult) {
              geocodingResult = await geo.geocodeCity(city)
            }

            department = getGeocodedDepartment(geocodingResult)
          }

          setCity(city)
          setDepartment(department)
          setLocation(marker[0], marker[1])
          setCenter(marker)

          typeof onClose === 'function' && onClose()
        },

        onSuggestSelect: async function handleSuggestSelect(suggest) {
          const { lat, lng } = suggest.location
          change('SetLocationForm', 'marker', [lat, lng])

          const res = await geo.getReverseGeocoding(lat, lng)
          const department = getGeocodedDepartment(res)
          change('SetLocationForm', 'department', department)
        }
      }

      setModal(modalTypes.SET_LOCATION, modalComponentProps, {
        basic: true,
        closeIcon: null,
        open: true,
        size: 'small'
      })
    }
  }
}

class HeaderContainer extends Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    this.forceUpdate()
  }

  render() {
    // this is why we use forceUpdate
    const isMobile = window.currentBreakpoint === sizeTypes.MOBILE
    const isTablet = window.currentBreakpoint === sizeTypes.TABLET

    const {
      city,
      currentUser,
      department,
      routePayload,
      routeType,
      routes,
      t,
      ...rest
    } = this.props

    const monadIcon = <Icon name="monad" height={16} width={16} />
    const placeIcon = <Icon name="place" height={16} width={16} />

    let entityIcon = null
    let entityIconTitle = ''
    let locationIcon = <Icon name="location arrow" />
    let locationIconTitle = t('header:location.title.default', { city })
    let { title, onTitleClick } = this.props
    let subtitle = ''

    if (
      [
        routerActions.ME,
        routerActions.ME_PLACE_EDIT,
        routerActions.ME_PLACES_ADD,
        routerActions.ME_USERS_ADD,
        routerActions.ME_USER_EDIT
      ].includes(routeType)
    ) {
      entityIconTitle = t('header:my_profile')

      entityIcon = monadIcon
      onTitleClick = null
    } else if ([routerActions.USER_VIEW].includes(routeType)) {
      entityIcon = monadIcon
      entityIconTitle =
        t('header:entityIcon.title.person') + ` ${routePayload.username}`
      locationIcon = null
      onTitleClick = null
      title = routePayload.username
    } else if (
      [routerActions.PLACE_VIEW, routerActions.PLACE_SYMBOLS_ADD].includes(
        routeType
      )
    ) {
      entityIcon = placeIcon
      entityIconTitle =
        t('header:entityIcon.title.place') + ` ${routePayload.placeTitle}`
      locationIconTitle = t('header:location.title.place')
      onTitleClick = null
      title = routePayload.placeTitle
    } else {
      entityIcon = null

      if (city === null) {
        title = t('loading')
      } else if (city === false) {
        title = t('header:title')
      } else {
        title = t('header:title_city', { city })
        subtitle = t('header:title')
      }
    }

    return (
      <Col
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {currentUser && (
          <HeaderLink
            title={t('header:my_profile_go')}
            to={routerActions.meRoute()}
            style={{ marginRight: '5px' }}
          >
            {currentUser.username}
          </HeaderLink>
        )}

        <HeaderLink to={routerActions.aboutRoute()} style={{ marginRight: 0 }}>
          <Icon name="question circle" title={t('header:help')} />
        </HeaderLink>

        {currentUser ? (
          <HeaderDropdown className="right" pointing={true} inline>
            <HeaderDropdown.Menu>
              <HeaderDropdown.Item
                content={<HeaderLinkRaw>{t('header:logout')}</HeaderLinkRaw>}
                onClick={e => routes.logoutRoute()}
              />
            </HeaderDropdown.Menu>
          </HeaderDropdown>
        ) : (
          <HeaderLink to={routerActions.authRoute()}>
            {t('header:login')}
          </HeaderLink>
        )}
      </Col>
    )
  }
}

const mapStateToProps = state => {
  const city = getCity(state)
  const department = getDepartment(state)
  const routeType = getRouteType(state)
  const title = getTitle(state)

  return {
    city,
    department,
    routePayload: getPayload(state),
    routeType,
    title,
    userLocation: getUserLocation(state)
  }
}

const mapDispatchToProps = {
  change,
  setCity: settingsActions.setCity,
  setDepartment: settingsActions.setDepartment,
  setLocation: settingsActions.setLocation,
  setCenter: mapActions.setCenter,
  setModal: modalActions.setModal
}

const logoutMutationConfig = { name: 'doLogout' }

export default compose(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(logoutMutation, logoutMutationConfig),
  getContext({ client: PropTypes.object }),
  withHandlers(handlers),
  pure
)(HeaderContainer)

/* <Col tablet={12}>
          <Grid columns={2} stackable>
            <Col tablet={6}>
              <HeaderLink to={routerActions.homeRoute()}>
                {t('header:map')}
              </HeaderLink>
            </Col>

            <Col tablet={10} textAlign={isMobile ? 'left' : 'center'}>
              <HeaderTitle
                {...rest}
                entityIcon={entityIcon}
                entityIconTitle={entityIconTitle}
                locationIcon={locationIcon}
                locationIconTitle={locationIconTitle}
                title={subtitle}
                onTitleClick={onTitleClick}
              >
                {title}
              </HeaderTitle>
            </Col>
          </Grid>
        </Col> */
