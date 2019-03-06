import React from 'react'
import styled from 'styled-components'

import { Grid } from '@/lib/ui/components/layout'
import media from '@/lib/ui/helpers/media'

export default styled(Grid)`
  ${media.COMPUTER`box-shadow: 0px -1px 10px black;`}
  ${media.MOBILE`box-shadow: none;`}
padding: 5px !important;
`
