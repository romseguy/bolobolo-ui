import React, { Component } from 'react'
import { Field } from 'redux-form'

import { Button, Col, Grid, Row } from '@/lib/ui/components/layout'

class UserFormFields extends Component {
  render() {
    const { formValues, userLocation, readOnly, showSelector, t } = this.props
    const { action } = formValues

    if (showSelector) {
      if (!action) {
        return null
      }
    }

    return (
      <Grid>
        {action === 'create' && (
          <Row>
            <Col mobile={16} tablet={16} computer={5}>
              <label htmlFor="email">Email :</label>
            </Col>

            <Col mobile={16} tablet={16} computer={11}>
              <Field
                name="email"
                component="input"
                type="text"
                id="email"
                disabled={readOnly}
              />
            </Col>
          </Row>
        )}

        {/*action === 'select' && (
          <Row>
            <Col mobile={16} tablet={16} computer={5}>
              <label htmlFor="city">Ville :</label>
            </Col>
            <Col mobile={16} tablet={16} computer={11}>
              <Field
                name="city"
                component={GeosuggestField}
                id="city"
                center={center}
                disabled={readOnly}
                t={t}
                onSuggestSelect={this.handleSuggestSelect}
              />
            </Col>
          </Row>
        )*/}

        <Row>
          <Col>
            <Button type="submit">{t(`form:user.${action}.save`)}</Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default UserFormFields
