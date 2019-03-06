import { BINARY_COLOR_BLUE_30, BINARY_COLOR_BLUE_50 } from 'binary-ui-styles'
import React from 'react'

import { HeaderLinkRaw, HeaderLink } from './'

function HeaderTitle(props) {
  const {
    children,
    entityIcon,
    entityIconTitle,
    title,
    locationIcon,
    locationIconTitle,
    onEntityIconClick,
    onLocationIconClick,
    onTitleClick
  } = props

  return (
    <div>
      {entityIcon && onEntityIconClick && (
        <HeaderLinkRaw
          title={entityIconTitle}
          onClick={onEntityIconClick}
          style={{
            borderBottom: `1px dashed ${BINARY_COLOR_BLUE_50}`,
            cursor: 'help',
            padding: '2px'
          }}
        >
          {entityIcon}
        </HeaderLinkRaw>
      )}
      {entityIcon && !onEntityIconClick && (
        <span
          style={{
            borderBottom: '1px dashed black',
            cursor: 'help',
            marginRight: '5px',
            paddingBottom: '2px'
          }}
          title={entityIconTitle}
        >
          {entityIcon}
        </span>
      )}
      {onTitleClick && (
        <HeaderLinkRaw title={title} onClick={onTitleClick}>
          {children}
        </HeaderLinkRaw>
      )}
      {!onTitleClick && <span title={title}>{children}</span>}{' '}
      {locationIcon && onLocationIconClick && (
        <HeaderLinkRaw title={locationIconTitle} onClick={onLocationIconClick}>
          {locationIcon}
        </HeaderLinkRaw>
      )}
    </div>
  )
}

export default HeaderTitle
