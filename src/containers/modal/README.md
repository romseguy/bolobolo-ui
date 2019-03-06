1. create the modal component in `containers.modal.modals`

2. either:

  - dispatch action created with `core.modal.actions.setModal` passing 3 args:
    - `modalType`: modal component identifier, see `lib.maps.modalTypes`
    - `modalComponentProps`: props that will be passed into the modal APP component
    - `modalProps`: props that will be passed into the modal UI component from https://react.semantic-ui.com/modules/modal or https://react.semantic-ui.com/addons/confirm
    
  - call `lib.sagas.toggleModal` with `{modaType, modalComponentProps, modalProps}`
