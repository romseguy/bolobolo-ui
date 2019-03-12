import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@/lib/ui/components/layout'
import Icon from '@/lib/ui/components/icon'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div style={{ display: 'flex', margin: '0 auto', alignItems: 'center' }}>
      <Icon name="parrot" height={32} /> {t('not_found')}.
    </div>
  )
}
