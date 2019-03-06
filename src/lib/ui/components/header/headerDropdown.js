import { BINARY_COLOR_BLUE_30, BINARY_COLOR_BLUE_50 } from 'binary-ui-styles'
import React from 'react'
import styled from 'styled-components'
import { Dropdown } from '@/lib/ui/components/layout'

const HeaderDropdown = styled(Dropdown)`
  color: ${BINARY_COLOR_BLUE_30};

  :hover {
    color: ${BINARY_COLOR_BLUE_50};
  }
`

HeaderDropdown.Menu = Dropdown.Menu
HeaderDropdown.Item = Dropdown.Item

export default HeaderDropdown
