import React from 'react'

import { Form, Icon, NoPadCol as Col, Row } from '@/lib/ui/components/layout'

function SelectField(props) {
  const { breakpoints, input, label, meta, options } = props

  const { touched, error } = meta

  const isError = !!error

  return (
    <Row>
      <Col {...breakpoints.label}>
        <label htmlFor={input.name}>{label}</label>
      </Col>

      <Col {...breakpoints.input}>
        <Form.Field control="select" error={isError} onChange={input.onChange}>
          <option />
          {options.map(({ key, text, value }) => (
            <option key={key} value={value}>
              {text}
            </option>
          ))}
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

export default SelectField
