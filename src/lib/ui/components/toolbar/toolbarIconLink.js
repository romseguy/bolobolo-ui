import {
  BINARY_COLOR_BLUE_50,
  BINARY_COLOR_GREEN_30,
  BINARY_COLOR_RED_50
} from 'binary-ui-styles'
import styled from 'styled-components'

const color = ({ active, disabled }) =>
  disabled
    ? '#bbb'
    : active === undefined
    ? BINARY_COLOR_RED_50
    : active === true
    ? BINARY_COLOR_GREEN_30
    : BINARY_COLOR_RED_50

const hoverColor = ({ active, disabled }) =>
  disabled ? '#bbb' : active ? BINARY_COLOR_GREEN_30 : BINARY_COLOR_BLUE_50

const cursor = ({ disabled }) => (disabled ? 'not-allowed' : 'pointer')

const ToolbarIconLink = styled.a`
  color: ${color};
  cursor: ${cursor};

  :hover {
    color: ${hoverColor};
  }

  label {
    cursor: ${cursor};
  }
`

export default ToolbarIconLink
