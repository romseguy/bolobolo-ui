import { call } from 'redux-saga/effects'
import modalTypes from '@/lib/constants/modalTypes'
import { toggleModalSaga } from '@/lib/sagas'

const defaultModalProps = {
  basic: true,
  size: 'small'
}

export default function* toggleErrorModalSaga({
  modalComponentProps,
  modalProps
} = {}) {
  if (!modalProps || !Object.keys(modalProps).length) {
    modalProps = defaultModalProps
  }

  yield call(toggleModalSaga, {
    modalType: modalTypes.ERROR,
    modalComponentProps,
    modalProps: {
      ...defaultModalProps,
      ...modalProps
    }
  })
}
