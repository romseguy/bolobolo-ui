import React from 'react'
import { reduxForm } from 'redux-form'
import { compose, pure, withHandlers } from 'recompose'
import { authStepsTypes, authTypes } from '@/lib/constants/auth'
import { Form as UIForm } from '@/lib/ui/components/layout'
import AuthFormStep1 from './authFormStep1'

const handlers = {
  onForgottenClick: props => () => {
    const { onSubmit, handleSubmit } = props

    handleSubmit(event, values => onSubmit(values))
  },
  onLoginClick: props => () => {
    const { onSubmit, handleSubmit } = props

    handleSubmit(event, values => onSubmit(values))
  },
  onRegisterClick: props => () => {
    const { onSubmit, handleSubmit } = props

    handleSubmit(event, values => onSubmit(values))
  }
}

function AuthForm(props) {
  const { currentStep, clientErrors, serverErrors, ...rest } = props

  const hasClientErrors = Array.isArray(clientErrors) && clientErrors.length > 0
  const hasServerErrors = Array.isArray(serverErrors) && serverErrors.length > 0

  return (
    <UIForm error={hasClientErrors || hasServerErrors} loading={false}>
      {currentStep === authStepsTypes.FIRST && (
        <AuthFormStep1
          clientErrors={clientErrors}
          hasClientErrors={hasClientErrors}
          hasServerErrors={hasServerErrors}
          serverErrors={serverErrors}
          {...rest}
        />
      )}

      {currentStep === authStepsTypes.REGISTER_OK && (
        <h1>{t('form:auth.department_confirm')}</h1>
      )}
    </UIForm>
  )
}

export default compose(
  reduxForm({
    form: 'AuthForm'
  }),
  withHandlers(handlers),
  pure
)(AuthForm)
