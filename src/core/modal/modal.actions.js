export const modalActions = {
  SET_MODAL: 'SET_MODAL',

  setModal: (modalType, modalComponentProps, modalProps) => ({
    type: modalActions.SET_MODAL,
    payload: {
      modalType,
      modalProps,
      modalComponentProps
    }
  }),

  closeModal: (modalType, modalComponentProps, modalProps) => {
    return modalActions.setModal(modalType, modalComponentProps, {
      open: false,
      ...modalProps
    })
  },

  openModal: (modalType, modalComponentProps, modalProps) => {
    return modalActions.setModal(modalType, modalComponentProps, {
      open: true,
      ...modalProps
    })
  }
}
