import React, { Component } from 'react'
import { authTypes } from '@/lib/constants/auth'
// import {
//   confirmation,
//   email,
//   length,
//   required
// } from '@/lib/ui/helpers/form/validators'

import InputField from '@/lib/ui/components/inputField'
import {
  Button,
  Form,
  Grid,
  Message,
  Row,
  NoPadCol as Col
} from '@/lib/ui/components/layout'
import Icon from '@/lib/ui/components/icon'
import { REG_EMAIL } from '../../helpers/form/validators_helpers'

class AuthFormStep1 extends Component {
  componentDidMount() {
    this.focusEmptyInput()
  }

  focusEmptyInput() {
    const { currentAction, formState } = this.props
    const isRegister = currentAction === authTypes.REGISTER
    const isForgotten = currentAction === authTypes.FORGOTTEN

    if (
      this.emailEl &&
      (!formState.values.email || !formState.values.email.length)
    ) {
      this.emailEl.focus()
    }

    // if (!emailInput.input.value.length) {
    //   emailInput.focusInput()
    // } else if (isRegister && !usernameInput.input.value.length) {
    //   usernameInput.focusInput()
    // } else if (
    //   !isForgotten &&
    //   passwordInput &&
    //   !passwordInput.input.value.length
    // ) {
    //   passwordInput.focusInput()
    // } else if (isRegister && !password2Input.input.value.length) {
    //   password2Input.focusInput()
    // }
  }

  handleForgottenClick = event => {
    const { currentAction, setCurrentAction, onSubmit } = this.props
    const isForgotten = currentAction === authTypes.FORGOTTEN

    if (isForgotten) {
      onSubmit()
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

  handleLoginClick = (values, actions) => {
    const { currentAction, setCurrentAction, onSubmit } = this.props
    const isLogin = currentAction === authTypes.LOGIN

    if (isLogin) {
      onSubmit()
    } else {
      event.preventDefault()
      setCurrentAction(authTypes.LOGIN)
      this.focusEmptyInput()
      this.resetServerErrors()
    }
  }

  handleRegisterClick = (values, actions) => {
    const { currentAction, setCurrentAction, onSubmit } = this.props
    const isRegister = currentAction === authTypes.REGISTER

    if (onSubmit) {
      onRegisterClick()
    } else {
      event.preventDefault()
      setCurrentAction(authTypes.REGISTER)
      this.focusEmptyInput()
      this.resetServerErrors()
    }
  }

  resetServerErrors() {
    const { setServerErrors } = this.props
    setServerErrors([])
  }

  renderButton(authType, positive = false) {
    const { t } = this.props

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
      <Button inverted onClick={onClick} positive={positive}>
        {t(`form:auth.${authType.toLowerCase()}`)}
      </Button>
    )
  }

  render() {
    const {
      currentAction,
      formBuilder: { email, password },
      formState: { validity, touched, values },
      hasServerErrors,
      serverErrors,
      t
    } = this.props

    const isRegister = currentAction === authTypes.REGISTER
    const isForgotten = currentAction === authTypes.FORGOTTEN

    let emailErrorEl = null
    let passwordErrorEl = null

    if (touched.email && !validity.email) {
      const emailError =
        values.email.length > 0
          ? t('errors:auth.email_invalid')
          : t('errors:required')

      emailErrorEl = (
        <>
          <Icon name="warning sign" title={emailError} />
          {emailError}
        </>
      )
    }

    if (touched.password && !validity.password) {
      const passwordError = !values.password.length
        ? t('errors:required')
        : values.password.length < 6
        ? t('errors:auth.password_too_short')
        : null

      passwordErrorEl = passwordError ? (
        <>
          <Icon name="warning sign" title={passwordError} />
          {passwordError}
        </>
      ) : null
    }

    return (
      <Grid>
        <Row>
          <Col>
            <div
              className={
                emailErrorEl ? 'error required field' : 'required field'
              }
            >
              <label
                htmlFor="email"
                style={{ color: emailErrorEl ? 'red' : 'white' }}
              >
                {t('form:auth.email')}
              </label>
              <div className="ui input">
                <input
                  {...email('email')}
                  placeholder="votre_email@lilo.org"
                  required
                  ref={el => (this.emailEl = el)}
                />
              </div>
            </div>
            {emailErrorEl && <Message error content={emailErrorEl} />}
          </Col>
        </Row>

        {!isForgotten && (
          <Row>
            <Col>
              <Form.Input
                label={{
                  htmlFor: 'password',
                  style: { color: passwordErrorEl ? 'red' : 'white' },
                  children: t('form:auth.password')
                }}
                {...password('password')}
                required
                minLength={6}
                error={!!passwordErrorEl}
              />
              {passwordErrorEl && <Message error content={passwordErrorEl} />}
            </Col>
          </Row>
        )}

        {hasServerErrors && (
          <Row>
            <Col>
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

        {/* <Row>
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
        </Row> */}
      </Grid>
    )
  }
}

export default AuthFormStep1

/*
{isRegister && (
          <input
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
        {isRegister && (
          <input
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
         */
