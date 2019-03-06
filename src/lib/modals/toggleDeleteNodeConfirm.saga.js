import { call } from 'redux-saga/effects'
import entityTypes from '@/lib/constants/entityTypes'
import modalTypes from '@/lib/constants/modalTypes'
import { toggleModalSaga } from '@/lib/sagas'

const defaultModalProps = {
  basic: true
}

export default function* toggleDeleteNodeConfirmSaga(
  { modalComponentProps, modalProps } = {},
  { node }
) {
  if (!modalProps || !Object.keys(modalProps).length) {
    modalProps = defaultModalProps
  }

  let modalType = null

  if (node.type === entityTypes.PLACE) {
    modalType = modalTypes.CONFIRM_DELETE_PLACE
  }

  if (modalType) {
    yield call(toggleModalSaga, {
      modalType,
      modalComponentProps,
      modalProps
    })
  }
}
