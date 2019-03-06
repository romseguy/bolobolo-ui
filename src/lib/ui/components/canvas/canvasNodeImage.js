import React from 'react'
import styled from 'styled-components'

import modeTypes from '@/lib/constants/modeTypes'

const CanvasNodeImage = styled.image`
  cursor: ${props => {
    if (props.currentMode === modeTypes.DISCOVERY) {
      if (props.node.isNew) {
        return 'default'
      }

      return 'zoom-in'
    }

    return 'pointer'
  }};
  outline: ${props => {
    if (props.currentMode === modeTypes.DISCOVERY) {
      if (props.node.isNew) {
        return '0'
      }
    }

    if (props.node.hovered || props.node.selected) {
      return '1px solid blue'
    }

    return '0'
  }};
`

export default CanvasNodeImage
