import React from 'react'
import { all, equals, values } from 'ramda'
import { authStepsTypes, authTypes } from '@/lib/constants/auth'
import { Form } from '@/lib/ui/components/layout'
import AuthFormStep1 from './authFormStep1'

function AuthForm(props) {
  const { currentStep, formState, serverErrors, onSubmit, ...rest } = props
  const hasServerErrors = Array.isArray(serverErrors) && serverErrors.length > 0
  const hasClientErrors = !all(v => v === true, values(formState.validity))
  const onStep1Submit = () => {
    if (hasClientErrors) return
    onSubmit()
  }

  return (
    <Form error={hasClientErrors || hasServerErrors} loading={false}>
      {currentStep === authStepsTypes.FIRST && (
        <AuthFormStep1
          formState={formState}
          hasServerErrors={hasServerErrors}
          serverErrors={serverErrors}
          onSubmit={onStep1Submit}
          {...rest}
        />
      )}

      {currentStep === authStepsTypes.REGISTER_OK && (
        <h1>{/* t('form:auth.department_confirm') */ 0}</h1>
      )}
    </Form>
  )
}

export default AuthForm
