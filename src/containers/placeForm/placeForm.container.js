import PropTypes from 'prop-types'
import React from 'react'
import { graphql } from 'react-apollo'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, getContext, pure, withHandlers, withState } from 'recompose'
import { change } from 'redux-form'

import geo from '@/lib/api/geo'
import { getGeocodedDepartment, getGeocodedProperty } from '@/lib/api/geo'
import roleTypes from '@/lib/constants/roleTypes'
import { formatErrorMessage, query } from '@/lib/helpers/apollo'
import getSuggestedDepartment from '@/lib/helpers/getSuggestedDepartment'
import { formValuesToPlace, placeToNode } from '@/lib/transformers'

import {
  canvasActions,
  getCanvasNodes,
  getCanvasNodesLoading
} from '@/core/canvas'
import { routerActions } from '@/core/router'
import { getTitle, getUserLocation } from '@/core/settings'

import createPlaceMutation from '@/lib/graphql/mutations/createPlace.mutation.graphql'
import createUserPlaceMutation from '@/lib/graphql/mutations/createUserPlace.mutation.graphql'
import updatePlaceMutation from '@/lib/graphql/mutations/updatePlace.mutation.graphql'
import myPlacesQuery from '@/lib/graphql/queries/myPlaces.query.graphql'
import placeQuery from '@/lib/graphql/queries/place.query.graphql'
import placesQuery from '@/lib/graphql/queries/places.query.graphql'
import PlaceFormDataContainer from './placeForm.dataContainer'

const refs = []

function getServerErrors(error, props) {
  let focused = false

  return JSON.parse(JSON.stringify(error)).graphQLErrors.map(error => {
    const { field_name, message, value } = error
    const ref = refs.find(({ name }) => name === field_name + 'Input')

    if (ref && !focused) {
      ref.node.getRenderedComponent().focusInput()
      focused = true
    }

    return {
      message: formatErrorMessage(message),
      value
    }
  })
}

export const handlers = {
  setRef: props => (name, node) => {
    if (refs.find(ref => ref.name === name)) {
      return
    }

    refs.push({
      name,
      node
    })
  },

  onMapClick: props => ({ event, latLng, pixel }) => {
    const [lat, lng] = latLng
    geo.getReverseGeocoding(lat, lng).then(res => {
      const city = getGeocodedProperty(res, 'city')
      const department = getGeocodedDepartment(res)
      props.change('PlaceForm', 'city', city)
      props.change('PlaceForm', 'department', department)
    })
  },

  onSubmit: props => async formValues => {
    const {
      client,
      doCreatePlace,
      doCreateUserPlace,
      doUpdatePlace,
      mine,
      placeId,
      routes,
      routeType,
      setNodes,
      setServerErrors
    } = props

    const { mePlaceEditRoute, meRoute } = routes

    setServerErrors([])

    let { nodes } = props
    const selectedNode = nodes.find(node => node.selected)

    if (!formValues.action || formValues.action === 'create') {
      let place = await formValuesToPlace(formValues)
      let data = null

      try {
        const res = await doCreatePlace({ place })
        data = res.data
      } catch (error) {
        setServerErrors(getServerErrors(error, props))
        return
      }

      const { id, title } = data.createPlace

      if (selectedNode) {
        nodes = nodes.map(node => {
          if (node.id === selectedNode.id) {
            return placeToNode(selectedNode.id, data.createPlace, {
              mine: true,
              x: selectedNode.x,
              y: selectedNode.y
            })
          }
          return node
        })
      } else {
        place = {
          ...place,
          id
        }
        nodes = nodes.concat([placeToNode(nodes.length, place, { mine: true })])
      }

      setNodes(nodes)
      meRoute()
    } else if (formValues.action === 'select') {
      let { place } = await query(
        client,
        {
          query: placeQuery,
          variables: { title: formValues.selectedPlaceTitle }
        },
        {
          cache: true,
          from: 'placeForm.container.onSubmit.select'
        }
      )

      let userPlace = {
        placeId: Number(place.id),
        roleId: roleTypes.FOLLOWER
      }

      if (selectedNode) {
        userPlace = {
          ...userPlace,
          x: selectedNode.x,
          y: selectedNode.y
        }
        nodes = nodes.map(node => {
          if (node.id === selectedNode.id) {
            return placeToNode(selectedNode.id, place, {
              mine: false,
              x: selectedNode.x,
              y: selectedNode.y
            })
          }
          return node
        })
      } else {
        nodes = nodes.concat([
          placeToNode(nodes.length, place, { mine: false })
        ])
      }

      setNodes(nodes)

      await doCreateUserPlace({ userPlace })
      meRoute()
    } else {
      if (routeType === routerActions.ME_PLACE_EDIT) {
        const place = await formValuesToPlace(formValues)

        const {
          data: { updatePlace: updatedPlace }
        } = await doUpdatePlace({ placeId, place })

        if (selectedNode) {
          nodes = nodes.map(node => {
            if (node.id === selectedNode.id) {
              return placeToNode(selectedNode.id, updatedPlace, {
                mine,
                x: selectedNode.x,
                y: selectedNode.y
              })
            }
            return node
          })

          setNodes(nodes)
        }
        mePlaceEditRoute(updatedPlace.title)
      }
    }
  },

  onSuggestSelect: props => suggest => {
    const department = getSuggestedDepartment(suggest)
    props.change('PlaceForm', 'department', department)
    props.change('PlaceForm', 'marker', null)
  },

  onViewClick: props => selectedPlaceTitle => {
    props.routes.placeViewRoute(selectedPlaceTitle)
  }
}

function PlaceFormContainer(props) {
  return <PlaceFormDataContainer {...props} />
}

const mapStateToProps = state => {
  const nodes = getCanvasNodes(state)
  const nodesLoading = getCanvasNodesLoading(state)
  const title = getTitle(state)
  const userLocation = getUserLocation(state)

  return {
    isLoading: nodesLoading,
    nodes,
    title,
    userLocation
  }
}

const mapDispatchToProps = {
  change,
  setNodes: canvasActions.setNodes
}

const createPlaceMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreatePlace({ place }) {
        return mutate({
          variables: {
            place
          },
          refetchQueries: [
            {
              query: placesQuery
            }
          ]
        })
      }
    }
  }
}

const createUserPlaceMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreateUserPlace({ userPlace }) {
        return mutate({
          variables: {
            userPlace
          },
          refetchQueries: [
            {
              query: myPlacesQuery
            }
          ]
        })
      }
    }
  }
}

const updatePlaceMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doUpdatePlace({ placeId, place }) {
        return mutate({
          variables: {
            placeId,
            place
          }
        })
      }
    }
  }
}

export default compose(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(createPlaceMutation, createPlaceMutationConfig),
  graphql(createUserPlaceMutation, createUserPlaceMutationConfig),
  graphql(updatePlaceMutation, updatePlaceMutationConfig),
  getContext({ client: PropTypes.object }),
  withState('serverErrors', 'setServerErrors', []),
  withHandlers(handlers)
)(PlaceFormContainer)
