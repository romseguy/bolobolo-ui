import React from 'react'
import { Tooltip } from 'redux-tooltip'
import styled from 'styled-components'

import {
  getCanvasNodeAnchorTooltipName,
  getCanvasNodeHeaderTooltipName
} from '@/lib/ui/helpers/tooltips'
import entityTypes from '@/lib/constants/entityTypes'
import modeTypes from '@/lib/constants/modeTypes'

import Icon from '@/lib/ui/components/icon'
import { Grid, Row as UIRow, Col as UICol } from '@/lib/ui/components/layout'

const Col = styled(UICol)`
  padding: 0.5rem 0 0.5rem 1rem !important;
  margin: 0 !important;
`

const Row = styled(UIRow)`
  padding: 0 !important;
  margin: 0 !important;
`

export function NodeAnchorTooltips({ t }) {
  const config = []

  Object.values(modeTypes).forEach(modeKey => {
    Object.values(entityTypes).forEach(type => {
      ;[true, false].forEach(selected => {
        config.push({ modeKey, selected, type })
      })
    })
  })

  return (
    <div>
      {config.map(({ modeKey, selected, type }) => {
        const discoveryMode = modeKey === modeTypes.DISCOVERY
        const editMode = modeKey === modeTypes.EDIT
        const tooltipName = getCanvasNodeAnchorTooltipName(modeKey, {
          selected,
          type
        })
        let width = 150

        if (discoveryMode) {
          if (type === entityTypes.PLACE) {
            width = 220
          } else if (type === entityTypes.PERSON) {
            width = 280
          }
        } else if (editMode) {
          width = 160

          if (selected) {
            width = 180
          }
        }

        return (
          <Tooltip key={tooltipName} name={tooltipName}>
            <Grid style={{ width: `${width}px` }}>
              {!discoveryMode && (
                <Row>
                  <Col tablet={5}>
                    <Icon name="mouseDrag" width={29} height={16} />
                  </Col>
                  <Col>déplacer</Col>
                </Row>
              )}
              <Row>
                <Col tablet={discoveryMode ? 3 : 5}>
                  <Icon name="mouseLeftClick" width={16} height={16} />
                </Col>
                <Col tablet={discoveryMode ? 13 : 11}>
                  {discoveryMode
                    ? t(`canvas:tooltips.${type.toLowerCase()}_node_anchor`)
                    : selected
                    ? 'déselectionner'
                    : 'sélectionner'}
                </Col>
              </Row>
            </Grid>
          </Tooltip>
        )
      })}
    </div>
  )
}

export function NodeHeaderTooltips({ t }) {
  return (
    <div>
      <Tooltip name={getCanvasNodeHeaderTooltipName({ mine: true })}>
        <Grid style={{ width: '105px' }}>
          <Row>
            <Col width={5}>
              <Icon name="mouseLeftClick" width={16} height={16} />
            </Col>
            <Col width={11}>{t('canvas:tooltips.node_header_mine')}</Col>
          </Row>
        </Grid>
      </Tooltip>

      <Tooltip
        name={getCanvasNodeHeaderTooltipName({ isNew: true, mine: true })}
      >
        <Grid style={{ width: '105px' }}>
          <Row>
            <Col width={5}>
              <Icon name="mouseLeftClick" width={16} height={16} />
            </Col>
            <Col width={11}>{t('canvas:tooltips.node_header_mine_new')}</Col>
          </Row>
        </Grid>
      </Tooltip>

      <Tooltip name={getCanvasNodeHeaderTooltipName({ mine: false })}>
        <div style={{ padding: '10px' }}>
          {t('canvas:tooltips.place_node_header')}
        </div>
      </Tooltip>
    </div>
  )
}

function CanvasTooltips({ t }) {
  return (
    <div>
      <NodeAnchorTooltips t={t} />
      <NodeHeaderTooltips t={t} />
    </div>
  )
}

export default CanvasTooltips
