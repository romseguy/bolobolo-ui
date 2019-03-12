import React from 'react'
import { compose, pure, withHandlers } from 'recompose'

import { Form as UIForm } from '@/lib/ui/components/layout'

import PlaceFormFields from './placeFormFields'
import PlaceFormHeader from './placeFormHeader'
import PlaceFormLayout from './placeFormLayout'
import PlaceFormSelectFields from './placeFormSelectFields'
import PlaceFormSelector from './placeFormSelector'

const handlers = {
  onSaveClick: props => event => {
    const { onSubmit, handleSubmit } = props

    handleSubmit(event, values => onSubmit(values))
  }
}

class PlaceForm extends React.Component {
  render() {
    const {
      action,
      disconnectedPlaces,
      hasServerErrors,
      isEdit,
      isLoading,
      isScriptLoading,
      ...rest
    } = this.props

    let showFields = false
    const showSelectFields = !isLoading && action === 'select'
    let showSelector = false

    if (action === 'create') {
      showFields = true
      showSelector = true
    } else if (action === 'select') {
      showFields = false
      showSelector = true
    } else {
      if (isEdit) {
        showSelector = false
        showFields = true
      } else {
        if (isLoading) {
          showSelector = true
        } else if (isScriptLoading) {
          showFields = true
        } else {
          if (disconnectedPlaces) {
            showSelector = true
          } else {
            showFields = true
          }
        }
      }
    }

    return (
      <PlaceFormLayout fluid>
        <PlaceFormHeader {...rest} />

        <UIForm error={hasServerErrors} loading={isLoading || isScriptLoading}>
          {showSelector && <PlaceFormSelector {...rest} />}

          {showSelectFields && (
            <PlaceFormSelectFields
              {...rest}
              disconnectedPlaces={disconnectedPlaces}
              hasServerErrors={hasServerErrors}
            />
          )}

          {showFields && (
            <PlaceFormFields
              {...rest}
              hasServerErrors={hasServerErrors}
              isLoading={isLoading}
              isScriptLoading={isScriptLoading}
              readOnly={false}
            />
          )}
        </UIForm>
      </PlaceFormLayout>
    )
  }
}

export default compose(withHandlers(handlers))(PlaceForm)
