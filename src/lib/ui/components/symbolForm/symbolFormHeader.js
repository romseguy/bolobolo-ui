import React from 'react'
import styled from 'styled-components'
import { Header, Icon } from '@/lib/ui/components/layout'

const Content = styled(Header.Content)`
  padding: 1rem;
`

function SymbolFormHeader(props) {
  const { isLoading, t, title } = props

  let iconName = 'linkify'
  let label = ''

  if (isLoading) {
    label = t('loading')
  } else {
    label = title
  }

  return (
    <Header as="h2" dividing>
      <Icon name={iconName} />
      <Content>{label}</Content>
    </Header>
  )
}

export default SymbolFormHeader
