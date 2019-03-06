import React from 'react'
import { Tooltip } from 'redux-tooltip'

import symbolTypes from '@/lib/constants/symbolTypes'
import { getSymbolsTooboxTooltipName } from '@/lib/ui/helpers/tooltips'

import Icon from '@/lib/ui/components/icon'

function SymbolsToolboxTooltips({ t }) {
  return (
    <div>
      {Object.keys(symbolTypes).map(type => {
        const tooltipLabel = t(
          `canvas:toolboxes.symbols.${type.toLowerCase()}.tooltip`
        )
        const tooltipName = getSymbolsTooboxTooltipName({ type })

        return (
          <Tooltip key={tooltipName} name={tooltipName}>
            <div
              style={{
                padding: '5px'
              }}
            >
              <Icon name="mouseDrag" width={29} height={16} /> {tooltipLabel}
            </div>
          </Tooltip>
        )
      })}
    </div>
  )
}

export default SymbolsToolboxTooltips
