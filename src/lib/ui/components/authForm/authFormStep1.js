import React, { Component } from 'react'
import { Field } from 'redux-form'
import { authTypes } from '@/lib/constants/auth'
import { AuthFormBreakpoints as breakpoints } from '@/lib/constants/breakpoints'
import {
  confirmation,
  email,
  length,
  required
} from '@/lib/ui/helpers/form/validators'

import InputField from '@/lib/ui/components/inputField'
import {
  Button,
  Grid,
  Message,
  Row,
  NoPadCol as Col
} from '@/lib/ui/components/layout'

class AuthFormStep1 extends Component {
  componentDidMount() {
    this.focusEmptyInput()
  }

  focusEmptyInput() {
    const { currentAction } = this.props
    const isRegister = currentAction === authTypes.REGISTER
    const isForgotten = currentAction === authTypes.FORGOTTEN
    const emailInput = this.emailInput.getRenderedComponent()
    const usernameInput =
      isRegister && this.usernameInput.getRenderedComponent()
    const passwordInput =
      !isForgotten && this.passwordInput.getRenderedComponent()
    const password2Input =
      isRegister && this.password2Input.getRenderedComponent()

    if (!emailInput.input.value.length) {
      emailInput.focusInput()
    } else if (isRegister && !usernameInput.input.value.length) {
      usernameInput.focusInput()
    } else if (
      !isForgotten &&
      passwordInput &&
      !passwordInput.input.value.length
    ) {
      passwordInput.focusInput()
    } else if (isRegister && !password2Input.input.value.length) {
      password2Input.focusInput()
    }
  }

  handleForgottenClick = event => {
    const { currentAction, setCurrentAction, onForgottenClick } = this.props
    const isForgotten = currentAction === authTypes.FORGOTTEN

    if (isForgotten) {
      onForgottenClick()
    } else {
      event.preventDefault()
      setCurrentAction(authTypes.FORGOTTEN)
      this.focusEmptyInput()
      this.resetServerErrors()
    }
  }

  handleInputChange = event => {
    this.resetServerErrors()
  }

  handleLoginClick = event => {
    const { currentAction, setCurrentAction, onLoginClick } = this.props
    const isLogin = currentAction === authTypes.LOGIN

    if (isLogin) {
      onLoginClick()
    } else {
      event.preventDefault()
      setCurrentAction(authTypes.LOGIN)
      this.focusEmptyInput()
      this.resetServerErrors()
    }
  }

  handleRegisterClick = event => {
    const { currentAction, setCurrentAction, onRegisterClick } = this.props
    const isRegister = currentAction === authTypes.REGISTER

    if (isRegister) {
      onRegisterClick()
    } else {
      event.preventDefault()
      setCurrentAction(authTypes.REGISTER)
      this.focusEmptyInput()
      this.resetServerErrors()
    }
  }

  renderButton(authType, positive = false) {
    const { submitting, t } = this.props

    let onClick = this.handleRegisterClick

    if (authType === authTypes.LOGIN) {
      onClick = this.handleLoginClick
    } else if (
      authType === authTypes.FORGOTTEN ||
      authType === authTypes.FORGOTTEN_CONFIRM
    ) {
      onClick = this.handleForgottenClick
    }

    return (
      <Button
        disabled={submitting}
        inverted
        onClick={onClick}
        positive={positive}
      >
        {t(`form:auth.${authType.toLowerCase()}`)}
      </Button>
    )
  }

  resetServerErrors() {
    const { setServerErrors } = this.props
    setServerErrors([])
  }

  render() {
    const {
      clientErrors,
      currentAction,
      hasClientErrors,
      hasServerErrors,
      serverErrors,
      t
    } = this.props

    const isRegister = currentAction === authTypes.REGISTER
    const isForgotten = currentAction === authTypes.FORGOTTEN

    const validatePassword = [required({ msg: t('errors:required') })]

    if (isRegister) {
      validatePassword.push(
        length({ min: 6, msg: t('errors:auth.password_too_short') })
      )
    }

    return (
      <Grid columns={2} verticalAlign="middle">
        <Field
          name="email"
          component={InputField}
          type="text"
          breakpoints={breakpoints}
          label={t('form:auth.email')}
          ref={node => (this.emailInput = node)}
          forwardRef
          validate={[
            required({ msg: t('errors:required') }),
            email({ msg: t('errors:auth.email_invalid') })
          ]}
          onChange={this.handleInputChange}
        />

        {isRegister && (
          <Field
            name="username"
            component={InputField}
            type="text"
            breakpoints={breakpoints}
            label={t('form:auth.username')}
            ref={node => (this.usernameInput = node)}
            forwardRef
            validate={[
              required({ msg: t('errors:required') }),
              length({ max: 40, msg: t('errors:register.username_too_long') })
            ]}
            onChange={this.handleInputChange}
          />
        )}

        {!isForgotten && (
          <Field
            name="password"
            component={InputField}
            type="password"
            breakpoints={breakpoints}
            label={t('form:auth.password')}
            ref={node => (this.passwordInput = node)}
            forwardRef
            validate={validatePassword}
            onChange={this.handleInputChange}
          />
        )}

        {isRegister && (
          <Field
            name="password2"
            component={InputField}
            type="password"
            breakpoints={breakpoints}
            label={t('form:auth.password2')}
            ref={node => (this.password2Input = node)}
            forwardRef
            validate={[
              confirmation({
                field: 'password',
                msg: t('errors:register.passwordsNotMatch')
              }),
              required({ msg: t('errors:required') })
            ]}
            onChange={this.handleInputChange}
          />
        )}

        {hasServerErrors && (
          <Row>
            <Col width={15}>
              <Message size="tiny" error>
                <Message.Header>{t('errors:auth.fixForm')}</Message.Header>
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
          <Button.Group>
            {isRegister
              ? this.renderButton(authTypes.REGISTER, true)
              : isForgotten
              ? this.renderButton(authTypes.FORGOTTEN_CONFIRM, true)
              : this.renderButton(authTypes.LOGIN, true)}
          </Button.Group>
        </Row>

        <Row>
          {isRegister ? (
            <Button.Group>
              {this.renderButton(authTypes.LOGIN)}
              <Button.Or text={t('or')} />
              {this.renderButton(authTypes.FORGOTTEN)}
            </Button.Group>
          ) : isForgotten ? (
            <Button.Group>
              {this.renderButton(authTypes.LOGIN)}
              <Button.Or text={t('or')} />
              {this.renderButton(authTypes.REGISTER)}
            </Button.Group>
          ) : (
            <Button.Group>
              {this.renderButton(authTypes.REGISTER)}
              <Button.Or text={t('or')} />
              {this.renderButton(authTypes.FORGOTTEN)}
            </Button.Group>
          )}
        </Row>
      </Grid>
    )
  }
}

export default AuthFormStep1
