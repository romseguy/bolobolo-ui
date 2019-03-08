import { css } from 'styled-components'
import breakpoints from '@/lib/constants/breakpoints'
import sizeTypes from '@/lib/constants/sizeTypes'

// media will be a map associating sizes labels with styled-components templates
const media = Object.keys(sizeTypes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = breakpoints[label] / 16

  accumulator[label] = (...args) => {
    if (label === sizeTypes.COMPUTER) {
      return css`
        ${css(...args)}
      `
    }

    return css`
      @media only screen and (max-width: ${emSize}em) {
        ${css(...args)}
      }
    `
  }

  return accumulator
}, {})

// https://www.styled-components.com/docs/advanced#media-templates
export default media
