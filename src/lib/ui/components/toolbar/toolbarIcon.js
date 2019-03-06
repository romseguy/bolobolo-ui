import React from 'react'
import { compose, pure } from 'recompose'
import Icon from '@/lib/ui/components/icon'
import ToolbarIconLink from './toolbarIconLink'

const noop = () => {}

function ToolbarIcon(props) {
  const {
    active,
    children,
    disabled,
    height,
    id,
    margin,
    name,
    title,
    width,
    onClick
  } = props

  return (
    <ToolbarIconLink
      active={active}
      disabled={disabled}
      onClick={disabled ? noop : onClick}
      title={title}
    >
      {children ? (
        children
      ) : (
        <Icon
          height={height}
          id={id}
          name={name}
          margin={margin}
          width={width}
        />
      )}
    </ToolbarIconLink>
  )
}

export default compose(pure)(ToolbarIcon)
