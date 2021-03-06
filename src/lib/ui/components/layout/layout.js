import React from 'react'
import {
  Accordion,
  Button,
  Confirm,
  Container,
  Dropdown, // todo: this module is huge, replace it with components/dropdown
  Form,
  Grid as UIGrid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Loader,
  Menu,
  Message,
  Modal,
  Radio,
  Segment,
  Select
} from 'semantic-ui-react'
import styled from 'styled-components'

const Col = UIGrid.Column

const Grid = styled(UIGrid)`
  margin: 0 !important;
  padding: 0 !important;
`

const NoPadCol = styled(Col)`
  padding: 0 !important;
`

const Row = UIGrid.Row

export {
  Accordion,
  Button,
  Col,
  Confirm,
  Container,
  Dropdown,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Loader,
  Menu,
  Message,
  Modal,
  NoPadCol,
  Radio,
  Row,
  Segment,
  Select
}

export default function Layout({ children, footer, header }) {
  return (
    <Grid celled style={{ height: '100vh' }}>
      <Row
        style={{
          height: '4%',
          alignContent: 'center'
        }}
      >
        {header}
      </Row>

      <Row style={{ height: '92%' }}>{children}</Row>

      <Row
        style={{
          height: '4%',
          alignContent: 'center'
        }}
      >
        {footer}
      </Row>
    </Grid>
  )
}
