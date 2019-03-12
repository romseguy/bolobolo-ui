import React from 'react'
import { compose, withHandlers } from 'recompose'

import { PlaceFormBreakpoints as breakpoints } from '@/lib/constants/breakpoints'
import { required } from '@/lib/ui/helpers/form/validators'

import {
  Button,
  Grid,
  Message,
  NoPadCol as Col,
  Row
} from '@/lib/ui/components/layout'
import SelectField from '@/lib/ui/components/selectField'

const handlers = {
  onViewClick: props => event => {
    const { selectedPlaceTitle, onViewClick } = props

    typeof onViewClick === 'function' && onViewClick(selectedPlaceTitle)
  }
}

function PlaceFormSelectFields(props) {
  const {
    disconnectedPlaces,
    hasServerErrors,
    serverErrors,
    submitting,
    t,
    valid,
    onSaveClick,
    onViewClick
  } = props

  return (
    <Grid verticalAlign="middle">
      <input
        name="selectedPlaceTitle"
        component={SelectField}
        breakpoints={breakpoints}
        label={t('form:place.name')}
        placeholder={t('form:place.select')}
        options={
          Array.isArray(disconnectedPlaces)
            ? disconnectedPlaces.map(place => {
                const option = {
                  key: place.id,
                  value: place.title,
                  text: place.title
                }

                return option
              })
            : []
        }
        validate={[required({ msg: t('errors:required') })]}
      />

      {hasServerErrors && (
        <Row>
          <Col width={16}>
            <Message size="tiny" error>
              <Message.Header>{t('errors:place.fixForm')}</Message.Header>
              <Message.List>
                {serverErrors.map(({ message }, i) => (
                  <Message.Item key={`serverError-${i}`}>
                    {message}
                  </Message.Item>
                ))}
              </Message.List>
            </Message>
          </Col>
        </Row>
      )}

      <Button disabled={submitting || !valid} positive onClick={onSaveClick}>
        {t('form:place.select_save')}
      </Button>
      <Button disabled={submitting || !valid} onClick={onViewClick}>
        {t('form:place.select_view')}
      </Button>
    </Grid>
  )
}

export default compose(withHandlers(handlers))(PlaceFormSelectFields)
