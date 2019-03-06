import React, { Component } from 'react'
import { Field } from 'redux-form'

import { required } from '@/lib/ui/helpers/form/validators'
import { SymbolFormBreakpoints as breakpoints } from '@/lib/constants/breakpoints'

import InputField from '@/lib/ui/components/inputField'
import TextareaField from '@/lib/ui/components/textareaField'

import {
  Button,
  NoPadCol as Col,
  Grid,
  Message,
  Row
} from '@/lib/ui/components/layout'

class SymbolFormFields extends Component {
  render() {
    const {
      formValues,
      hasServerErrors,
      isLoading,
      isScriptLoading,
      mine,
      prefix,
      readOnly,
      serverErrors,
      submitting,
      t,
      valid,
      onSaveClick
    } = this.props

    const tWithPrefix = (path, options) => {
      if (isLoading) {
        return t('loading')
      }

      return t(prefix + path, options)
    }

    return (
      <Grid verticalAlign="middle">
        <Col width={16}>
          {mine === false && (
            <Message
              icon="warning sign"
              content={tWithPrefix('.description')}
            />
          )}
        </Col>

        <Field
          name="title"
          component={InputField}
          type="text"
          breakpoints={breakpoints}
          label={tWithPrefix('.fields.title')}
          ref={node => (this.titleInput = node)}
          forwardRef
          validate={[required({ msg: t('errors:required') })]}
        />

        <Field
          name="body"
          component={TextareaField}
          breakpoints={breakpoints}
          label={tWithPrefix('.fields.body')}
          ref={node => (this.textareaInput = node)}
          forwardRef
          validate={[required({ msg: t('errors:required') })]}
        />

        {hasServerErrors && (
          <Row>
            <Col width={16}>
              <Message size="tiny" error>
                <Message.Header>{t('errors:symbol.fixForm')}</Message.Header>
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

        <Row>
          <Col>
            <Button
              disabled={submitting || !valid}
              positive
              onClick={onSaveClick}
            >
              {t('form:symbol.save')}
            </Button>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default SymbolFormFields
