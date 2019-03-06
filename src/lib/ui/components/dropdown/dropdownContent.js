import React from 'react'
import { compose, pure, withHandlers } from 'recompose'
import styled from 'styled-components'

const Content = styled.div`
  position: absolute;
  z-index: 9999;
`

function DropdownContent(props) {
  const { children, ...rest } = props

  return <Content {...rest}>{children}</Content>
}

export default compose(pure)(DropdownContent)
