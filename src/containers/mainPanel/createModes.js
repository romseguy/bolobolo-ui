import modeTypes from '@/lib/constants/modeTypes'

export default function createModes(t) {
  return [
    {
      iconId: 'search',
      key: modeTypes.DISCOVERY,
      labels: {
        active: t('canvas:modes.discovery.labels.active'),
        disabled: t('canvas:modes.discovery.labels.disabled'),
        inactive: t('canvas:modes.discovery.labels.inactive')
      },
      margin: '0 0.4rem 0 0'
    },
    {
      iconId: 'edit',
      key: modeTypes.EDIT,
      labels: {
        active: t('canvas:modes.edit.labels.active'),
        disabled: t('canvas:modes.edit.labels.disabled'),
        inactive: t('canvas:modes.edit.labels.inactive')
      },
      margin: '0 0 0 0'
    }
  ]
}
