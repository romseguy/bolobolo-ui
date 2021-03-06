import React, { Component, useState } from 'react'
import { graphql } from 'react-apollo'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, pure, withHandlers, withState } from 'recompose'
import { useFormState } from 'react-use-form-state'

import { formatErrorMessage } from '@/lib/helpers/apollo'
import { authStepsTypes, authTypes } from '@/lib/constants/auth'
import modalTypes from '@/lib/constants/modalTypes'

import { modalActions } from '@/core/modal'
import { routerActions } from '@/core/router'

import currentUserQuery from '@/lib/graphql/queries/currentUser.query.graphql'
import myPlacesQuery from '@/lib/graphql/queries/myPlaces.query.graphql'
import loginMutation from '@/lib/graphql/mutations/login.mutation.graphql'
import registerMutation from '@/lib/graphql/mutations/register.mutation.graphql'

import AuthForm from '@/lib/ui/components/authForm'

function getServerErrors(error) {
  error = JSON.parse(JSON.stringify(error))

  return (
    error &&
    Array.isArray(error.graphQLErrors) &&
    error.graphQLErrors.map(error => {
      const { field_name, message, value } = error

      return {
        message: formatErrorMessage(message),
        value
      }
    })
  )
}

// const handlers = {
//   onSubmit: props => async (formValues /*dispatch*/) => {
//     const {
//       currentAction,
//       currentStep,
//       doLogin,
//       doRegister,
//       homeRoute,
//       setCurrentStep,
//       setServerErrors,
//       setModal
//     } = props
//     const isRegister = currentAction === authTypes.REGISTER
//     const isForgotten = currentAction === authTypes.FORGOTTEN

//     switch (currentStep) {
//       case authStepsTypes.FIRST:
//         if (isRegister) {
//           try {
//             const result = await doRegister(formValues)

//             if (!result.stack) {
//               setModal(modalTypes.AUTH, {}, { open: false })
//               homeRoute()
//               // todo: setCurrentStep(authStepsTypes.REGISTER_OK)
//             }
//           } catch (error) {
//             setServerErrors(getServerErrors(error))
//           }
//         } else if (isForgotten) {
//           // todo
//         } else {
//           try {
//             await doLogin(formValues)
//             setModal(modalTypes.AUTH, {}, { open: false })
//             homeRoute()
//           } catch (error) {
//             setServerErrors(getServerErrors(error))
//           }
//         }
//         break

//       case authStepsTypes.REGISTER_OK:
//         // todo
//         break
//     }
//   }
// }

function AuthFormContainer(props) {
  const { doLogin } = props
  const [serverErrors, setServerErrors] = useState([])
  const [currentStep, setCurrentStep] = useState(authStepsTypes.FIRST)
  const [currentAction, setCurrentAction] = useState(authTypes.LOGIN)
  const [authFormState, authFormBuilder] = useFormState()

  const onSubmit = async () => {
    console.log('submit', authFormState)

    try {
      await doLogin(authFormState.values)
      setModal(modalTypes.AUTH, {}, { open: false })
      homeRoute()
    } catch (error) {
      setServerErrors(getServerErrors(error))
    }
  }

  return (
    <AuthForm
      onSubmit={onSubmit}
      formBuilder={authFormBuilder}
      formState={authFormState}
      serverErrors={serverErrors}
      setServerErrors={setServerErrors}
      currentStep={currentStep}
      setCurrentStep={setCurrentStep}
      currentAction={currentAction}
      setCurrentAction={setCurrentAction}
      {...props}
    />
  )
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = {
  setModal: modalActions.setModal,
  homeRoute: routerActions.homeRoute
}

const loginMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doLogin(variables) {
        return mutate({
          variables,
          refetchQueries: [
            {
              query: currentUserQuery
            },
            {
              query: myPlacesQuery
            }
          ]
        })
      }
    }
  }
}

const registerMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doRegister(variables) {
        return mutate({
          variables,
          refetchQueries: [
            {
              query: currentUserQuery
            },
            {
              query: myPlacesQuery
            }
          ]
        })
      }
    }
  }
}

export default compose(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(loginMutation, loginMutationConfig),
  graphql(registerMutation, registerMutationConfig),
  pure
)(AuthFormContainer)
