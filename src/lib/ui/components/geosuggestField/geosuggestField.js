import '@/lib/assets/scss/geosuggest.scss'

import React, { Component } from 'react'
import Geosuggest from 'react-geosuggest'

import createLatLngObject from '@/lib/ui/helpers/createLatLngObject'

import { Form, Icon, NoPadCol as Col, Row } from '@/lib/ui/components/layout'

const getSuggestLabel = suggest => {
  return suggest.description.replace(/([^,]+).+/, (match, p1) => p1)
}

class GeosuggestField extends Component {
  componentWillReceiveProps(nextProps) {
    // https://github.com/ubilabs/react-geosuggest/issues/275
    if (this.props.input.value !== nextProps.input.value) {
      this.input.update(nextProps.input.value)
    }
  }

  focusInput() {
    this.input.focus()
  }

  handleSuggestSelect = suggest => {
    this.props.input.onChange(suggest.label)
    this.props.onSuggestSelect(suggest)
  }

  render() {
    const {
      breakpoints = { label: {}, input: {} },
      disabled,
      input,
      label,
      center,
      meta,
      placeholder,
      skipSuggest
    } = this.props

    const { touched, error } = meta

    const isError = touched && !!error

    return (
      <Row>
        <Col {...breakpoints.label}>
          <label htmlFor={input.name}>{label}</label>
        </Col>

        <Col {...breakpoints.input}>
          <Form.Field error={isError}>
            <Geosuggest
              {...input}
              ref={node => (this.input = node)}
              autoActivateFirstSuggest
              country="fr"
              getSuggestLabel={getSuggestLabel}
              id={input.name}
              initialValue={input.value}
              location={createLatLngObject(center[0], center[1])}
              disabled={disabled}
              placeholder={placeholder}
              radius="20"
              skipSuggest={skipSuggest}
              onChange={input.onChange}
              onSuggestSelect={this.handleSuggestSelect}
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

export default GeosuggestField
