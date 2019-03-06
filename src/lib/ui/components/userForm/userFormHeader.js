import React from 'react'
import styled from 'styled-components'
import { Header, Icon } from '@/lib/ui/components/layout'

const Content = styled(Header.Content)`
  padding: 1rem;
`

function UserFormHeader({ routeType, routeTypes, t, title }) {
  let iconName = 'linkify'
  let label = ''

  if (routeType === routeTypes.ME_USER_EDIT) {
    label =
      title === null ? t('loading') : `${t('form:user.header_edit')} ${title}`
  } else if (routeType === routeTypes.ME_USERS_ADD) {
    label = t('form:user.header_add')
  }

  return (
    <Header as="h2" dividing>
      <Icon name={iconName} />
      <Content>{label}</Content>
    </Header>
  )
}

export default UserFormHeader
