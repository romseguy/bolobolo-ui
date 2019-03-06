import React from 'react'
import Icon from '@/lib/ui/components/icon'

function TextIcon(props) {
  let height = undefined
  let width = undefined

  if (props.name === 'mouseDrag') {
    height = 14
    width = 29
  } else if (props.name) {
    height = 14
    width = 14
  }

  return (
    <Icon
      height={height}
      style={{ display: 'inline' }}
      width={width}
      {...props}
    />
  )
}

export default TextIcon
