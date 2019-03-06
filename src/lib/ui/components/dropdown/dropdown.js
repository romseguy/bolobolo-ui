import PropTypes from 'prop-types'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { compose, pure, withHandlers, withState } from 'recompose'

import Container from './dropdownContainer'
import Content from './dropdownContent'
import Trigger from './dropdownTrigger'

const handlers = {
  onDocumentClick: props => (event, component) => {
    const { isMounted, setIsExpanded } = props

    if (isMounted) {
      if (!ReactDOM.findDOMNode(component).contains(event.target)) {
        setIsExpanded(false)
      }
    }
  },

  onTriggerMouseDown: props => event => {
    const { isExpanded, isMounted, setIsExpanded } = props

    if (!isMounted) {
      return
    }

    setIsExpanded(!isExpanded)

    typeof onMouseDown === 'function' && onMouseDown(event)
  }
}

class Dropdown extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired,
    content: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
    onMouseDown: PropTypes.func
  }

  componentDidMount() {
    const { setIsMounted } = this.props

    setIsMounted(true)
    document.addEventListener('click', this.handleDocumentClick)
    document.addEventListener('touchend', this.handleDocumentClick)
  }

  componentWillUnmount() {
    const { setIsMounted } = this.props

    setIsMounted(false)
    document.removeEventListener('click', this.handleDocumentClick)
    document.removeEventListener('touchend', this.handleDocumentClick)
  }

  handleDocumentClick = event => {
    this.props.onDocumentClick(event, this)
  }

  render() {
    const {
      children,
      content,
      isExpanded,
      isMounted,
      onTriggerMouseDown,
      ...rest
    } = this.props

    return (
      <Container {...rest}>
        <Trigger
          onMouseDown={onTriggerMouseDown}
          onTouchEnd={onTriggerMouseDown}
          {...rest}
        >
          {children}
        </Trigger>

        {isExpanded && <Content {...rest}>{content}</Content>}
      </Container>
    )
  }
}

export default compose(
  withState('isExpanded', 'setIsExpanded', false),
  withState('isMounted', 'setIsMounted', false),
  withHandlers(handlers),
  pure
)(Dropdown)
