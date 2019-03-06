import React, { Component } from 'react'

import { Form, Icon, NoPadCol as Col, Row } from '@/lib/ui/components/layout'

class Textarea extends Component {
  focusInput() {
    this.input.focus()
  }

  handleChange = event => {
    typeof this.props.onChange === 'function' && this.props.onChange(event)
    this.props.input.onChange(event)
  }

  render() {
    const { breakpoints, input, label, meta } = this.props

    const { touched, error } = meta

    const isError = touched && !!error

    return (
      <Row>
        <Col {...breakpoints.label}>
          <label htmlFor={input.name}>{label}</label>
        </Col>

        <Col {...breakpoints.input}>
          <Form.Field error={isError}>
            <textarea
              {...input}
              onChange={this.handleChange}
              id={input.name}
              ref={node => (this.input = node)}
              title={error}
            />
          </Form.Field>
        </Col>

        {isError && (
          <Col width={1} textAlign="right">
            <Icon name="warning sign" title={error} />
          </Col>
        )}
      </Row>
    )
  }
}

export default Textarea
