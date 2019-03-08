import React from 'react'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import { getTitle } from '@/core/settings'

function HelmetContainer({ t, title }) {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="canonical" href="http://mysite.com/example" />

      <title>
        {t('app_title')} {title ? `| ${title}` : ''}
      </title>
    </Helmet>
  )
}

const mapStateToProps = state => {
  const title = getTitle(state)

  return {
    title
  }
}

const mapDispatchToProps = {}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation(),
  pure
)(HelmetContainer)
