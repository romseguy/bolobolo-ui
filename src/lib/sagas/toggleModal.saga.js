import { put, select } from 'redux-saga/effects'
import { modalActions, getModals } from '@/core/modal'

export default function* toggleModalSaga({
  modalType,
  modalComponentProps,
  modalProps
}) {
  const modals = yield select(getModals)
  const modal = modals[modalType]
  console.log('modal', modal)

  if (!modal) {
    console.log('modalType', modalType)
    console.log('modalComponentProps', modalComponentProps)
    console.log('modalProps', modalProps)
    yield put(
      modalActions.setModal(modalType, modalComponentProps, {
        ...modalProps,
        open: true
      })
    )
    return
  }

  yield put(
    modalActions.setModal(modalType, modalComponentProps, {
      ...modalProps,
      open: !modal.modalProps.open
    })
  )
}
