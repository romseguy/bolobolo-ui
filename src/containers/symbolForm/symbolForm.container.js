import { merge } from 'ramda'
import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { compose, pure, withHandlers } from 'recompose'

import roleTypes from '@/lib/constants/roleTypes'

import {
  canvasActions,
  getCanvasNodes,
  getCanvasNodesLoading
} from '@/core/canvas'
import { routerActions, getPayload, getRouteType } from '@/core/router'
import { getTitle, getUserLocation } from '@/core/settings'

import { Container } from '@/lib/ui/components/layout'
import SymbolForm, { SymbolFormHeader } from '@/lib/ui/components/symbolForm'

import SymbolFormDataContainer from './symbolForm.dataContainer'

//import symbolFormQuery from './symbol.form.query.graphql'
//import createSymbolMutation from './createSymbol.mutation.graphql'
//import createUserSymbolMutation from './createUserSymbol.mutation.graphql'

const handlers = {
  onSubmit: props => formValues => {
    const { todo /* todo */ } = formValues

    const symbol = {
      //todo
    }
    props.doCreateSymbol({ symbol })
  },
  onSuggestSelect: props => suggest => {
    const { short_name: city } = suggest.gmaps.address_components.find(
      address_component => {
        return address_component.types.includes('locality')
      }
    )

    const { short_name: department } = suggest.gmaps.address_components.find(
      address_component => {
        return address_component.types.includes('administrative_area_level_2')
      }
    )

    props.change('SymbolForm', 'city', city)
    props.change('SymbolForm', 'department', department)
  }
}

function SymbolFormContainer(props) {
  const { ...rest } = props

  return <SymbolFormDataContainer {...rest} />
}

const mapStateToProps = state => {
  const nodesLoading = getCanvasNodesLoading(state)
  const title = getTitle(state)
  const userLocation = getUserLocation(state)

  return {
    formValues: state.form.SymbolForm ? state.form.SymbolForm.values : {},
    isLoading: nodesLoading,
    title,
    userLocation
  }
}

const mapDispatchToProps = {
  change,
  meRoute: routerActions.meRoute
}

const symbolFormQueryConfig = {
  options: props => {
    return {
      variables: {
        title: props.symbolName
      }
    }
  },
  props({ data }) {
    const { mySymbols, symbol, symbols, loading } = data

    let initialValues = {}

    if (symbol) {
      initialValues = merge(initialValues, {
        city: symbol.city,
        marker: [symbol.latitude, symbol.longitude],
        title: symbol.title
      })
    }

    let props = {
      initialValues,
      isLoading: loading,
      mustCreate: !symbols || !symbols.length
    }

    if (symbols) {
      props = merge(props, {
        disconnectedSymbols: mySymbols
          ? symbols.filter(symbol => {
              return !mySymbols.find(
                userSymbol => userSymbol.symbol.id === symbol.id
              )
            })
          : symbols
      })
    }

    return props
  }
}

const createSymbolMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreateSymbol({ symbol }) {
        return mutate({
          variables: {
            symbol
          }
        })
      }
    }
  }
}

const createUserSymbolMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreateUserSymbol({ symbolId, roleId }) {
        return mutate({
          variables: {
            symbolId: Number(symbolId)
          }
        })
      }
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  /*graphql(symbolFormQuery, symbolFormQueryConfig),
   graphql(createSymbolMutation, createSymbolMutationConfig),
   graphql(createUserSymbolMutation, createUserSymbolMutationConfig),*/
  withHandlers(handlers),
  pure
)(SymbolFormContainer)
