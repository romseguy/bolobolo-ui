import React from 'react'

import { EntitiesToolboxTooltips } from '@/lib/ui/components/entitiesToolbox'
import { SymbolsToolboxTooltips } from '@/lib/ui/components/symbolsToolbox'

export default function ToolboxTooltips({ t }) {
  return (
    <div>
      <EntitiesToolboxTooltips t={t} />
      <SymbolsToolboxTooltips t={t} />
    </div>
  )
}
