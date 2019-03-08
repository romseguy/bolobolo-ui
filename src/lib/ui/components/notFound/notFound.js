import React from 'react'
import { useTranslation } from 'react-i18next'
import { Grid } from '@/lib/ui/components/layout'
import Icon from '@/lib/ui/components/icon'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <Grid>
      <h1>
        <Icon name="parrot" height={32} /> 404
      </h1>
      <p>{t('not_found')}.</p>
    </Grid>
  )
}
