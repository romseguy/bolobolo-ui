import React from 'react'
import { Origin } from 'redux-tooltip'

import DraggableToolboxItem from '@/lib/ui/components/draggableToolboxItem'
import Icon from '@/lib/ui/components/icon'
import { Label } from '@/lib/ui/components/layout'
import Toolbox, { ToolboxMenu } from '@/lib/ui/components/toolbox'

function EntitiesToolbox({ entities, isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <Toolbox isOpen={isOpen} onClose={onClose}>
      <ToolboxMenu>
        {entities.map(entity => {
          return (
            <Origin key={entity.tooltipName} name={entity.tooltipName}>
              <DraggableToolboxItem
                id={entity.tooltipName}
                itemAttributes={entity}
                style={{ cursor: 'move', padding: '0.5rem 0' }}
              >
                <Label basic image>
                  <Icon
                    height={entity.height}
                    name={entity.iconName}
                    type={entity.type}
                    width={entity.width}
                  />
                  {entity.label}
                </Label>
              </DraggableToolboxItem>
            </Origin>
          )
        })}
      </ToolboxMenu>
    </Toolbox>
  )
}

export default EntitiesToolbox
