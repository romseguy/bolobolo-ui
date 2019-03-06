import { merge } from 'ramda'
import React from 'react'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import { change } from 'redux-form'
import { compose, pure, withHandlers } from 'recompose'

import roleTypes from '@/lib/constants/roleTypes'
import { getTitle, getUserLocation } from '@/core/settings'
import { routerActions, getPayload, getRouteType } from '@/core/router'

import createUserMutation from '@/lib/graphql/mutations/createUser.mutation.graphql'
import createUserUserMutation from '@/lib/graphql/mutations/createUserUser.mutation.graphql'

import { Container } from '@/lib/ui/components/layout'
import UserForm, { UserFormHeader } from '@/lib/ui/components/userForm'

import userFormQuery from './user.form.query.graphql'

const handlers = {
  onSubmit: props => formValues => {
    const { action, selected, city, department, marker, title } = formValues

    if (action === 'select') {
      props.doCreateUserUser({ userId: selected, roleId: roleTypes.GUARDIAN })
    } else {
      const [latitude, longitude] = marker
      const user = {
        city,
        department,
        latitude,
        longitude,
        title
      }
      props.doCreateUser({ user })
    }
  }
}

function UserFormContainer(props) {
  const {
    // state
    formValues,
    initialValues,
    userLocation,
    disconnectedUsers,
    routeType,
    title,
    // options
    isLoading,
    mustCreate,
    // actions
    t,
    onSubmit
  } = props

  return (
    <Container fluid>
      <UserFormHeader
        routeType={routeType}
        routeTypes={routerActions}
        t={t}
        title={title}
      />
      <UserForm
        formValues={formValues}
        initialValues={initialValues}
        isLoading={isLoading}
        userLocation={userLocation}
        mustCreate={mustCreate}
        disconnectedUsers={disconnectedUsers}
        routeType={routeType}
        routeTypes={routerActions}
        t={t}
        onSubmit={onSubmit}
      />
    </Container>
  )
}

const mapStateToProps = state => {
  const routeType = getRouteType(state)
  const { name: username } = getPayload(state)
  const userLocation = getUserLocation(state)
  const title = getTitle(state)

  return {
    formValues: state.form.UserForm ? state.form.UserForm.values : {},
    userLocation,
    username,
    routeType,
    title
  }
}

const mapDispatchToProps = {
  change,
  meRoute: routerActions.meRoute
}

const userFormQueryConfig = {
  options: props => {
    return {
      variables: {
        username: props.username
      }
    }
  },
  props({ data }) {
    const { myUsers, user, users, loading } = data

    let initialValues = {}

    if (user) {
      initialValues = merge(initialValues, {
        city: user.city,
        marker: [user.latitude, user.longitude],
        title: user.title
      })
    }

    let props = {
      initialValues,
      isLoading: loading,
      mustCreate: !users || !users.length
    }

    if (users) {
      props = merge(props, {
        disconnectedUsers: myUsers
          ? users.filter(user => {
              return !myUsers.find(userUser => userUser.user.id === user.id)
            })
          : users
      })
    }

    return props
  }
}

const createUserMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreateUser({ user }) {
        return mutate({
          variables: {
            user
          }
        })
      }
    }
  }
}

const createUserUserMutationConfig = {
  props({ ownProps, mutate }) {
    return {
      doCreateUserUser({ userId, roleId }) {
        return mutate({
          variables: {
            userId: Number(userId),
            roleId: Number(roleId)
          }
        })
      }
    }
  }
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  graphql(userFormQuery, userFormQueryConfig),
  graphql(createUserMutation, createUserMutationConfig),
  graphql(createUserUserMutation, createUserUserMutationConfig),
  withHandlers(handlers),
  pure
)(UserFormContainer)
