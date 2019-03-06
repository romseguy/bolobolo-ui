import { getSymbolsTooboxTooltipName } from '@/lib/ui/helpers/tooltips'

import symbolTypes from '@/lib/constants/symbolTypes'

const abstractToolboxSymbol = {
  height: 50,
  isNew: true,
  mine: true,
  titleYOffset: 50,
  width: 50
}

export default {
  [symbolTypes.PARROT]: ({ t }) => ({
    ...abstractToolboxSymbol,
    iconName: 'parrot',
    iconNameSelected: 'parrot',
    label: t('canvas:toolboxes.symbols.parrot.label'),
    name: t('canvas:symbols.parrot.new'),
    tooltipName: getSymbolsTooboxTooltipName({ type: symbolTypes.PARROT }),
    type: symbolTypes.PARROT
  })
}
