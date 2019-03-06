import React from 'react'
import { Field } from 'redux-form'
import {
  Col,
  Form as UIForm,
  Grid,
  Radio,
  Row
} from '@/lib/ui/components/layout'
import Select from '@/lib/ui/components/selectField'

function RadioGroup(props) {
  const { input, t } = props
  const onChange = value => () => input.onChange(value)

  return (
    <div>
      <UIForm.Field>
        <Radio
          checked={input.value === 'create'}
          label={t('form:user.create.label')}
          name={input.name}
          onChange={onChange('create')}
        />
      </UIForm.Field>
      <UIForm.Field>
        <Radio
          checked={input.value === 'select'}
          label={t('form:user.select.label')}
          name={input.name}
          onChange={onChange('select')}
        />
      </UIForm.Field>
    </div>
  )
}

function UserFormSelector(props) {
  const { disconnectedUsers, formValues, t } = props
  const { action } = formValues

  return (
    <Grid>
      <Row>
        <Col mobile={16} tablet={16} computer={11}>
          <Field name="action" component={RadioGroup} t={t} />
        </Col>
      </Row>

      {action === 'select' && (
        <Row>
          <Col mobile={16} tablet={16} computer={5}>
            <label>Nom du lieu :</label>
          </Col>
          <Col mobile={16} tablet={16} computer={11}>
            <Field
              name="userId"
              component={Select}
              placeholder={t('form:user.select.label')}
              options={
                Array.isArray(disconnectedUsers)
                  ? disconnectedUsers.map(user => {
                      const option = {
                        key: user.id,
                        value: user.id,
                        text: user.title
                      }

                      return option
                    })
                  : []
              }
            />
          </Col>
        </Row>
      )}
    </Grid>
  )
}

export default UserFormSelector
