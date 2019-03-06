import { EntitiesToolbox, SymbolsToolbox } from '@/containers/toolbox'
import { ToolboxButton } from '@/lib/ui/components/toolbox'
import modeTypes from '@/lib/constants/modeTypes'

export default function createToolboxes(currentMode, setToolboxIsOpen, t) {
  return [
    {
      key: 'entities',
      button: ToolboxButton,
      buttonProps: {
        active: false,
        disabled: currentMode !== modeTypes.EDIT,
        iconName: 'eye',
        label: t('canvas:entities.label_plural'),
        title: t('canvas:entities.add'),
        toggle: true,
        onClick: () => setToolboxIsOpen('entities')
      },
      component: EntitiesToolbox,
      props: {
        isOpen: false,
        key: 'canvas-entities-toolbox',
        onClose: () => setToolboxIsOpen('entities', false)
      }
    },
    {
      key: 'symbols',
      button: ToolboxButton,
      buttonProps: {
        active: false,
        disabled: currentMode !== modeTypes.EDIT,
        iconName: 'bullseye',
        label: t('canvas:symbols.label') + 's',
        title: t('canvas:symbols.add'),
        toggle: true,
        onClick: () => setToolboxIsOpen('symbols')
      },
      component: SymbolsToolbox,
      props: {
        isOpen: false,
        key: 'canvas-symbols-toolbox',
        onClose: () => setToolboxIsOpen('entities', false)
      }
    }
  ]
}
