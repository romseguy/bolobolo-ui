import PropTypes from 'prop-types'
import React, { Component, useContext } from 'react'
import { connect } from 'react-redux'
import { compose, getContext } from 'recompose'

import bindActionCreators from '@/lib/helpers/bindActionCreators'
import { watchQuery } from '@/lib/helpers/apollo'

import { meActions, getCurrentUser } from '@/core/me'
import { routerActions } from '@/core/router'

import Footer from '@/containers/footer'
import Header from '@/containers/header'
import Helmet from '@/containers/helmet'
import Modals from '@/containers/modal'
import Router from '@/containers/router'

import Layout from '@/lib/ui/components/layout'

import currentUserQuery from '@/lib/graphql/queries/currentUser.query.graphql'

class App extends Component {
  componentDidMount() {
    watchQuery(
      this.props.client,
      { query: currentUserQuery },
      {
        from: 'App.componentDidMount',
        onError: error => error,
        onNext: data => this.props.setCurrentUser(data.currentUser)
      }
    )
  }

  render() {
    const { ...rest } = this.props

    return (
      <>
        <Helmet />

        <Layout header={<Header {...rest} />} footer={<Footer />}>
          <Router {...rest} />
        </Layout>

        <Modals />
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: getCurrentUser(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    routes: bindActionCreators(routerActions, dispatch),
    setCurrentUser: bindActionCreators(meActions.setCurrentUser, dispatch)
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  getContext({ client: PropTypes.object })
)(App)
