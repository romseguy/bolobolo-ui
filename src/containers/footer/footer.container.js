import { BINARY_COLOR_BLUE_30, BINARY_COLOR_BLUE_50 } from 'binary-ui-styles'
import PropTypes from 'prop-types'
import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, getContext, pure, withHandlers } from 'recompose'
import styled from 'styled-components'

import sizeTypes from '@/lib/constants/sizeTypes'

import { settingsActions, getLang } from '@/core/settings'

import { FooterLink, FooterGrid } from '@/lib/ui/components/footer'
import Icon from '@/lib/ui/components/icon'
import { Dropdown, NoPadCol as Col } from '@/lib/ui/components/layout'

const Parrot = styled(Icon)`
  display: inline-block !important;
`

const Version = styled.span`
  border-bottom: 1px dashed ${BINARY_COLOR_BLUE_30};
  cursor: help;
  margin-left: 10px;

  :hover {
    border-color: ${BINARY_COLOR_BLUE_50};
  }
`

const handlers = {
  onLangChange: props => (event, data) => {
    props.i18n.changeLanguage(data.value)
    props.setLang(data.value)
  }
}

function FooterContainer(props) {
  const { currentLang, t, onLangChange } = props
  // todo resize handler
  const isMobile = window.currentBreakpoint === sizeTypes.MOBILE

  return (
    <>
      <Col width={3}>
        <Dropdown
          defaultValue={currentLang}
          inline
          options={[
            {
              key: 'fr',
              text: 'French',
              value: 'fr'
            },
            {
              key: 'en',
              text: 'English',
              value: 'en'
            }
          ]}
          pointing="top"
          upward
          onChange={onLangChange}
        />
      </Col>
      <Col
        width={13}
        style={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        {t('app_title')} <Version title={t('version')}>v1.0-alpha</Version>
      </Col>
    </>
  )
}

const mapStateToProps = state => {
  const currentLang = getLang(state)

  return {
    currentLang
  }
}

const mapDispatchToProps = {
  setLang: settingsActions.setLang
}

export default compose(
  withTranslation(),
  getContext({ i18n: PropTypes.object }),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers(handlers),
  pure
)(FooterContainer)
