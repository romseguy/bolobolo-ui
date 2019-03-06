import React from 'react'
import styled from 'styled-components'

import icons from '@/lib/assets/icons'

import { Icon as UIIcon, Image } from '@/lib/ui/components/layout'

function IconChevronBottom() {
  return <path d="M30 12 L16 24 2 12" />
}

function IconChevronLeft() {
  return <path d="M20 30 L8 16 20 2" />
}

function IconChevronRight() {
  return <path d="M12 30 L24 16 12 2" />
}

function IconChevronTop() {
  return <path d="M30 20 L16 8 2 20" />
}

function IconClose() {
  return <path d="M2 30 L30 2 M30 30 L2 2" />
}

function IconCompose() {
  return (
    <path d="M27 15 L27 30 2 30 2 5 17 5 M30 6 L26 2 9 19 7 25 13 23 Z M22 6 L26 10 Z M9 19 L13 23 Z" />
  )
}

function IconEdit() {
  return (
    <path d="M30 7 L25 2 5 22 3 29 10 27 Z M21 6 L26 11 Z M5 22 L10 27 Z" />
  )
}

function IconMinus() {
  return <path d="M2 16 L30 16" />
}

function IconPlus() {
  return <path d="M16 2 L16 30 M2 16 L30 16" />
}

function IconSearch() {
  return (
    <g>
      <circle cx="14" cy="14" r="12" />
      <path d="M23 23 L30 30" />
    </g>
  )
}

function IconTrash() {
  return (
    <path d="M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6" />
  )
}

function IconVolume() {
  return (
    <path d="M20 16 C20 8 15 2 15 2 L8 10 2 10 2 22 8 22 15 30 C15 30 20 24 20 16 Z M21 2 C21 2 25 6 25 16 25 26 21 30 21 30 M27 4 C27 4 30 8 30 16 30 24 27 28 27 28" />
  )
}

const iconComponents = {
  'chevron-bottom': IconChevronBottom,
  'chevron-left': IconChevronLeft,
  'chevron-right': IconChevronRight,
  'chevron-top': IconChevronTop,
  close: IconClose,
  compose: IconCompose,
  edit: IconEdit,
  minus: IconMinus,
  plus: IconPlus,
  search: IconSearch,
  trash: IconTrash,
  volume: IconVolume
}

const defaultBytesizeProps = {
  fill: 'none',
  margin: 0,
  size: 1.2,
  sstyle: 'miter',
  weight: 'regular'
}

const styleToLinecap = {
  bevel: 'butt',
  miter: 'butt',
  round: 'round'
}

const styleToLinejoin = {
  bevel: 'bevel',
  miter: 'miter',
  round: 'round'
}

const weightToRem = {
  ultra: '0.05',
  thin: '0.1',
  light: '0.15',
  regular: '0.2',
  medium: '0.25',
  bold: '0.3',
  heavy: '0.35'
}

const IconSvg = styled.svg.attrs({
  strokeLinecap: props => styleToLinecap[props.sstyle],
  strokeLinejoin: props => styleToLinejoin[props.sstyle],
  strokeWidth: props => weightToRem[props.weight]
})`
  margin: ${props => props.margin};
  height: ${props => props.size}rem;
  stroke-width: ${props => props.strokeWidth}rem;
  stroke-linecap: ${props => props.strokeLinecap};
  stroke-linejoin: ${props => props.strokeLinejoin};
  width: ${props => props.size}rem;
`

const withIcon = bytesizeProps => {
  return function(IconComponent) {
    return (
      <IconSvg stroke="currentColor" viewBox="0 0 32 32" {...bytesizeProps}>
        <IconComponent />
      </IconSvg>
    )
  }
}

function Icon(props) {
  const { height, id, name, width, ...rest } = props

  const iconComponent = iconComponents[id]

  if (iconComponent) {
    return withIcon({
      ...defaultBytesizeProps,
      ...rest,
      id: `i-${id}`
    })(iconComponent)
  }

  const src = icons[name]

  if (src) {
    return (
      <Image
        src={src}
        width={width}
        height={height}
        style={{
          margin: props.margin
        }}
      />
    )
  } else if (name) {
    return <UIIcon name={name} {...rest} />
  }
}

export default Icon
