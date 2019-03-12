import React from 'react'
import { compose } from 'recompose'

import {
  NoPadCol as Col,
  Grid,
  Form as UIForm,
  Radio,
  Row
} from '@/lib/ui/components/layout'

function RadioGroup(props) {
  const { input, t } = props
  const onChange = value => () => input.onChange(value)

  return (
    <Row>
      <Col mobile={16} tablet={16} computer={11}>
        <UIForm.Field>
          <Radio
            checked={input.value === 'create'}
            label={t('form:place.create')}
            name={input.name}
            onChange={onChange('create')}
          />
        </UIForm.Field>
        <UIForm.Field>
          <Radio
            checked={input.value === 'select'}
            label={t('form:place.select')}
            name={input.name}
            onChange={onChange('select')}
          />
        </UIForm.Field>
      </Col>
    </Row>
  )
}

function PlaceFormSelector({ t }) {
  return (
    <Grid>
      <input name="action" component={RadioGroup} t={t} />
    </Grid>
  )
}

export default compose()(PlaceFormSelector)
