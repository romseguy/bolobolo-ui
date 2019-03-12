import React from 'react'
import modalTypes from '@/lib/constants/modalTypes'
import AuthFormContainer from '@/containers/authForm'
import { Button, Header, Icon, Modal } from '@/lib/ui/components/layout'
import SetLocationForm from '@/lib/ui/components/setLocationForm'

export default {
  [modalTypes.AUTH]: function AuthModal({ modalProps }) {
    return (
      <Modal {...modalProps}>
        <AuthFormContainer />
      </Modal>
    )
  },

  [modalTypes.CONFIRM_DELETE_PLACE]: function ConfirmDeletePlaceModal({
    modalProps,
    content,
    options,
    title,
    onConfirm
  }) {
    return (
      <Modal {...modalProps}>
        <Header>
          <Icon name="warning sign" />
          {title}
        </Header>
        <Modal.Content>
          {content}
          <ol>
            {options.map((option, i) => {
              const labels = !option.labels ? null : (
                <ol>
                  {option.labels.map((subOption, j) => (
                    <li key={`option-${j}-sub`}>{subOption}</li>
                  ))}
                </ol>
              )

              return (
                <div key={`option-${i}`}>
                  <li>{option.label}</li>
                  {labels}
                </div>
              )
            })}
          </ol>
        </Modal.Content>
        <Modal.Actions>
          {options.map((option, i) => (
            <Button inverted key={`option-${i}-submit`} onClick={onConfirm}>
              <Icon name={option.submitIconName} /> {option.submitLabel}
            </Button>
          ))}
        </Modal.Actions>
      </Modal>
    )
  },

  [modalTypes.ERROR]: ({ modalProps, errors = [], title }) => (
    <Modal {...modalProps}>
      <Header>
        <Icon name="warning sign" />
        {title}
      </Header>
      <Modal.Content>
        <ul>
          {errors.map((error, id) => (
            <li key={`error-${id}`}>{error.message || error}</li>
          ))}
        </ul>
      </Modal.Content>
      <Modal.Actions>
        <Button inverted onClick={modalProps.onClose}>
          <Icon name="checkmark" /> OK
        </Button>
      </Modal.Actions>
    </Modal>
  ),

  [modalTypes.SET_LOCATION]: ({
    modalProps,
    center,
    t,
    title,
    onSubmit,
    onSuggestSelect
  }) => {
    const handleSubmit = values => onSubmit(values, modalProps.onClose)

    return (
      <Modal {...modalProps}>
        <Header icon="world" content={title} />
        <SetLocationForm
          center={center}
          t={t}
          onSubmit={handleSubmit}
          onSuggestSelect={onSuggestSelect}
        />
      </Modal>
    )
  }
}
