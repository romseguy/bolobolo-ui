import React from 'react'
import { compose, pure, withHandlers } from 'recompose'
import styled from 'styled-components'

const Container = styled.div`
  display: inline-block;
`

function DropdownContainer(props) {
  const { children, ...rest } = props

  return <Container {...rest}>{children}</Container>
}

export default compose(pure)(DropdownContainer)
