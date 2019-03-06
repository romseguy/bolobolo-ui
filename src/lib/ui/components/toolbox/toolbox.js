import React from 'react'
import { withHandlers } from 'recompose'
import styled from 'styled-components'

import Icon from '@/lib/ui/components/icon'
import { ToolbarIconLink } from '@/lib/ui/components/toolbar'

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.94);
  border: 1.5px solid #d1d1d1;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  padding-bottom: 10px;
  padding-left: 26px;
  padding-right: 26px;
  padding-top: 26px;
  position: absolute;
  top: -1px;
`

const handlers = {
  onCloseClick: ({ onClose }) => e => {
    e.preventDefault()
    typeof onClose === 'function' && onClose()
  }
}

function Toolbox({ children, onCloseClick }) {
  return (
    <Container text>
      {onCloseClick && (
        <ToolbarIconLink
          onClick={onCloseClick}
          style={{ position: 'absolute', right: '10px', top: '10px' }}
        >
          <Icon id="close" />
        </ToolbarIconLink>
      )}

      {children}
    </Container>
  )
}

export default withHandlers(handlers)(Toolbox)
