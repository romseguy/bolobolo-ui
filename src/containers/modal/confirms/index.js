import React from 'react'
import modalTypes from '@/lib/constants/modalTypes'
import { Confirm } from '@/lib/ui/components/layout'

export default {
  [modalTypes.CONFIRM]: function ConfirmModal({ modalProps }) {
    return <Confirm {...modalProps} />
  }
}
