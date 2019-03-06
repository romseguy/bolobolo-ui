import React from 'react'
import debug from '@/lib/helpers/debug'

export default function withModal(modalProps, modalComponentProps) {
  return function(ModalComponent) {
    if (!modalProps.open) {
      return null
    }

    //debug('[withModal.modalProps]', modalProps)
    //debug('[withModal.modalComponentProps]', modalComponentProps)

    return <ModalComponent modalProps={modalProps} {...modalComponentProps} />
  }
}
