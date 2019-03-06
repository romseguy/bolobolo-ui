import React, { Component } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'

import { providers } from '@/lib/ui/helpers/map'
import { NoPadCol as Col, Row } from '@/lib/ui/components/layout'

class MapField extends Component {
  handleMapClick = click => {
    const { event, latLng, pixel } = click

    if (!this.props.readOnly) {
      this.props.onMapClick(click)
      this.props.input.onChange(latLng)
    }
  }

  render() {
    const { breakpoints, center, input, label, zoom } = this.props

    const latLng = input.value
    let marker = null

    if (Array.isArray(latLng)) {
      marker = <Marker anchor={latLng} />
    }

    return (
      <Row>
        <Col {...breakpoints.label}>
          <label htmlFor={input.name}>{label}</label>
        </Col>

        <Col {...breakpoints.input}>
          <ContainerDimensions>
            {({ width }) => (
              <Map
                center={center}
                id={input.name}
                provider={providers['outdoors']}
                height={200}
                width={width}
                zoom={zoom}
                onBoundsChanged={this.handleBoundsChange}
                onClick={this.handleMapClick}
              >
                {marker}
              </Map>
            )}
          </ContainerDimensions>
        </Col>
      </Row>
    )
  }
}

export default MapField
