import React from 'react'
import { Tooltip } from 'redux-tooltip'

import entityTypes from '@/lib/constants/entityTypes'
import { getEntitiesTooboxTooltipName } from '@/lib/ui/helpers/tooltips'

import Icon from '@/lib/ui/components/icon'

function EntitiesToolboxTooltips({ t }) {
  return (
    <div>
      {Object.keys(entityTypes).map(type => {
        const tooltipLabel = t(
          `canvas:toolboxes.entities.${type.toLowerCase()}.tooltip`
        )
        const tooltipName = getEntitiesTooboxTooltipName({ type })

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

export default EntitiesToolboxTooltips
