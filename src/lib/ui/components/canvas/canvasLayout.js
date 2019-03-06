import styled from 'styled-components'
import media from '@/lib/ui/helpers/media'

export default styled.div`
  ${media.COMPUTER`
margin-left: 15px;
margin-right: 15px;
`}
  ${media.MOBILE`
margin-left: 0;
margin-right: 0;
`}
`
