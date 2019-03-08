import '@/lib/assets/scss/modal.scss'

import React from 'react'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { compose, pure } from 'recompose'

import { modalActions, getModals } from '@/core/modal'

import debug from '@/lib/helpers/debug'
import withModal from '@/lib/ui/helpers/decorators/withModal'
import { Icon } from '@/lib/ui/components/layout'

import modalComponents from '@/lib/modals'
import confirmComponents from './confirms'

const closeIcon = (
  <div style={{ position: 'absolute', top: -15, right: 0 }}>
    <Icon name="close" fitted style={{ cursor: 'pointer', color: 'white' }} />
  </div>
)

function ModalContainer({ modals, t, setModal }) {
  const modalTypes = Object.keys(modals)

  if (!modalTypes.length) {
    return null
  }

  return (
    <div>
      {modalTypes.map(modalType => {
        let { modalProps, ...modalComponentProps } = modals[modalType] // get modal state
        let modalComponent = null

        if (modalComponents[modalType]) {
          modalComponent = modalComponents[modalType]
          modalProps = {
            closeIcon,
            onClose: () => setModal(modalType, {}, { open: false }),
            ...modalProps
          }
        } else if (confirmComponents[modalType]) {
          modalComponent = confirmComponents[modalType]
          modalProps = {
            onCancel: () => setModal(modalType, {}, { open: false }),
            onConfirm: () => setModal(modalType, {}, { open: false }),
            ...modalProps
          }
        }

        if (!modalComponent) {
          debug(
            'modal.container: a component could not be matched with type: ' +
              modalType
          )
          return null
        }

        modalComponentProps = {
          key: `modal-${modalType}`,
          t,
          ...modalComponentProps
        }

        // apply hoc
        return withModal(modalProps, modalComponentProps)(modalComponent)
      })}
    </div>
  )
}

const mapStateToProps = state => ({
  modals: getModals(state)
})

const mapDispatchToProps = {
  setModal: modalActions.setModal
}

export default compose(
  withTranslation(),
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  pure
)(ModalContainer)
