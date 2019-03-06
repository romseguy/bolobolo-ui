import React from 'react'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'
import { I18nextProvider } from 'react-i18next'

import App from '@/app'

/* REDUX-TOOLTIP HACK */
import PT from 'prop-types'
React.PropTypes = PT
/* REDUX-TOOLTIP HACK */

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    error: null,
    errorInfo: null
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true, error, errorInfo })

    // if we have Bugsnag in this environment, we can notify our error tracker
    if (window.Bugsnag) {
      window.Bugsnag.notify(error)
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.render(this.state.error, this.state.errorInfo)
    }
    return this.props.children
  }
}

function Root({ client, i18n, store }) {
  return (
    <ErrorBoundary
      render={props => {
        console.log('$$$props', props)
        return <div className="error">I've got issues.</div>
      }}
    >
      <Provider store={store}>
        <ApolloProvider client={client}>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </ApolloProvider>
      </Provider>
    </ErrorBoundary>
  )
}

export default Root
