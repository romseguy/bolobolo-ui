import React from 'react'
import { compose, pure, withHandlers } from 'recompose'
import styled from 'styled-components'

const Trigger = styled.div`
  cursor: pointer;
`

const handlers = {
  onMouseDown: props => event => {
    const { disabled, onMouseDown } = props

    if (disabled) {
      return
    }

    if (event.type === 'mousedown' && event.button !== 0) {
      return
    }

    typeof onMouseDown === 'function' && onMouseDown(event)
  }
}

function DropdownTrigger(props) {
  const { children, ...rest } = props

  return <Trigger {...rest}>{children}</Trigger>
}

export default compose(
  withHandlers(handlers),
  pure
)(DropdownTrigger)
