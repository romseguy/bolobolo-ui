import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import routes from '@/routes'
import { getRouteType } from '@/core/router'
import SymbolsToolbox from '@/lib/ui/components/symbolsToolbox'
import toolboxSymbols from './toolboxSymbols'

function SymbolsToolboxContainer(props) {
  return <SymbolsToolbox {...props} />
}

const mapStateToProps = (state, { t }) => {
  const routeType = getRouteType(state)
  const { allowedSymbolTypes = [] } = routes[routeType]
  const symbols = allowedSymbolTypes.map(symbolType =>
    toolboxSymbols[symbolType]({ t })
  )

  return {
    symbols
  }
}

const mapDispatchToProps = {}

export default compose(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
)(SymbolsToolboxContainer)
