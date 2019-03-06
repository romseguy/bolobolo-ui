import { call } from 'redux-saga/effects'
import modalTypes from '@/lib/constants/modalTypes'
import { toggleModalSaga } from '@/lib/sagas'

const defaultModalProps = {
  basic: true,
  closeOnRootNodeClick: false,
  size: 'small'
}

export default function* toggleAuthModalSaga({
  modalComponentProps,
  modalProps
} = {}) {
  if (!modalProps || !Object.keys(modalProps).length) {
    modalProps = defaultModalProps
  }

  yield call(toggleModalSaga, {
    modalType: modalTypes.AUTH,
    modalComponentProps,
    modalProps: {
      ...defaultModalProps,
      ...modalProps
    }
  })
}
