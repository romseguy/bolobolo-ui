import React from 'react'
import { compose, pure, withHandlers } from 'recompose'
import styled from 'styled-components'

import media from '@/lib/ui/helpers/media'
import entityTypes from '@/lib/constants/entityTypes'

import {
  Button,
  Col as UICol,
  Grid,
  Segment
} from '@/lib/ui/components/layout'

import ToolbarIcon from './toolbarIcon'

const Col = styled(UICol)`
  width: auto !important;

  ${media.MOBILE`
padding: 0 !important;
`}
`

const handlers = {
  onActionClick: props => (event, callback, disabled = false) => {
    event.preventDefault()

    if (!disabled && typeof callback === 'function') {
      callback(props.selectedNode)
    }
  },

  onDeleteClick: props => event =>
    handlers.onActionClick(props)(
      event,
      props.onToolbarDeleteClick,
      props.deleteDisabled
    ),

  onDetailsClick: props => event => {
    handlers.onActionClick(props)(
      event,
      props.onToolbarDetailsClick,
      props.detailsDisabled
    )
  },

  onEditClick: props => event =>
    handlers.onActionClick(props)(
      event,
      props.onToolbarEditClick,
      props.editDisabled
    ),

  onModeClick: props => (event, modeKey, disabled = false) => {
    if (!disabled && typeof props.onToolbarModeClick === 'function') {
      props.onToolbarModeClick(modeKey)
    }
  }
}

function Toolbar(props) {
  const {
    currentMode,
    modes,
    selectedNode,
    t,
    toolboxes,
    onDeleteClick,
    deleteDisabled = false,
    onDetailsClick,
    detailsDisabled = false,
    onEditClick,
    editDisabled = false,
    onModeClick,
    onZoomInClick,
    zoomInDisabled = false,
    onZoomOutClick,
    zoomOutDisabled = true
  } = props

  const selectedNodeType = selectedNode && selectedNode.type

  return (
    <Grid>
      <Col
        style={{
          paddingLeft: 0
        }}
      >
        <Segment
          compact
          style={{
            border: 0,
            padding: '0.75rem 0.4rem 0.4rem 0.4rem'
          }}
        >
          {modes.map(mode => {
            const {
              disabled,
              height,
              iconId,
              iconName,
              key,
              margin,
              labels,
              text,
              width
            } = mode

            const active = currentMode === key

            const title = disabled
              ? labels.disabled
              : active
              ? labels.active
              : labels.inactive

            return (
              <ToolbarIcon
                active={active}
                disabled={disabled}
                height={height}
                id={iconId}
                key={key}
                margin={margin}
                name={iconName}
                text={text}
                title={title}
                width={width}
                onClick={event => onModeClick(event, key, disabled)}
              />
            )
          })}
        </Segment>
      </Col>

      {toolboxes.map(toolbox => {
        return (
          <Col
            key={`toolbox-button-${toolbox.key}`}
            style={{ paddingLeft: 0, paddingRight: 0 }}
          >
            {React.createElement(toolbox.button, toolbox.buttonProps)}
          </Col>
        )
      })}

      <Col>
        <Segment
          compact
          style={{
            border: 0,
            padding: '0.75rem 0.4rem 0.4rem 0.4rem'
          }}
        >
          <ToolbarIcon
            disabled={deleteDisabled}
            id="trash"
            margin="0 0.4rem 0 0"
            title={t(
              `canvas:buttons.${
                Object.keys(entityTypes).includes(selectedNodeType)
                  ? 'delete_selected_entity'
                  : 'delete_selected_symbol'
              }`
            )}
            onClick={onDeleteClick}
          />

          <ToolbarIcon
            disabled={editDisabled}
            id="compose"
            margin="0 0 0 0"
            title={t(
              `canvas:buttons.${
                Object.keys(entityTypes).includes(selectedNodeType)
                  ? 'edit_selected_entity'
                  : 'edit_selected_symbol'
              }`
            )}
            onClick={onEditClick}
          />
        </Segment>
      </Col>

      <Col
        floated="right"
        style={{
          paddingRight: 0
        }}
      >
        <Button
          disabled={detailsDisabled}
          icon="caret left"
          title={t('canvas:buttons.details_show')}
          onClick={onDetailsClick}
        />
      </Col>
    </Grid>
  )
}

export default compose(
  withHandlers(handlers),
  pure
)(Toolbar)
