import React, { Component } from 'react'
import { compose, pure } from 'recompose'

import { Form as UIForm, Loader } from '@/lib/ui/components/layout'

import UserFormFields from './userFormFields'
import UserFormSelector from './userFormSelector'

class UserForm extends Component {
  render() {
    const {
      disconnectedUsers,
      formValues,
      isLoading,
      mustCreate,
      routeType,
      routeTypes,
      t,
      handleSubmit
    } = this.props

    if (isLoading) {
      return <Loader active inline="centered" />
    }

    let readOnly = false
    let showSelector = false

    switch (routeType) {
      case routeTypes.ME_USERS_ADD:
        if (!mustCreate) {
          showSelector = true
        }
        break
    }

    return (
      <div>
        {showSelector && (
          <UIForm loading={false} onSubmit={handleSubmit}>
            <UserFormSelector
              disconnectedUsers={disconnectedUsers}
              formValues={formValues}
              t={t}
            />
          </UIForm>
        )}

        <UIForm loading={false} onSubmit={handleSubmit}>
          <UserFormFields
            formValues={formValues}
            readOnly={readOnly}
            showSelector={showSelector}
            t={t}
          />
        </UIForm>
      </div>
    )
  }
}

export default compose(pure)(UserForm)
