import React from 'react'
import styled from 'styled-components'

/*export const Overlay = styled.div`
pointer-events: none;
backgroundColor: none;
position: fixed;
top: 0px;
left: 0px;
right: 0px;
bottom: 0px;
`*/

export default styled.div`
  #pointer-events: all;
  position: absolute;
  top: 0;
  left: 50%;
  right: 0;
  bottom: 0;
  border: 0;
  background: rgb(255, 255, 255);
  overflow: auto;
  border-left: 1px solid rgb(204, 204, 204);
  border-radius: 0;
  outline: none;
  padding: 0;
`
