import React from 'react'
import ReactDOM from 'react-dom'

export default function configureRender(client, i18n, store) {
  return Root => {
    ReactDOM.render(
      <Root client={client} i18n={i18n} store={store} />,
      document.getElementById('app')
    )
  }
}
