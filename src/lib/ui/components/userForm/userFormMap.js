import React, { Component } from 'react'
import ContainerDimensions from 'react-container-dimensions'
import Map from 'pigeon-maps'
import Marker from 'pigeon-marker'
import { providers } from '@/lib/ui/helpers/map'

class UserFormMap extends Component {
  handleMapClick = e => {
    const { input, readOnly } = this.props

    if (!readOnly) {
      input.onChange(e.latLng)
    }
  }

  render() {
    const { center, input, zoom } = this.props

    const latLng = input.value
    let marker = null

    if (Array.isArray(latLng)) {
      marker = <Marker anchor={latLng} />
    }

    return (
      <ContainerDimensions>
        {({ width }) => (
          <Map
            center={center}
            zoom={zoom}
            provider={providers['outdoors']}
            height={200}
            width={width - 30}
            onBoundsChanged={this.handleBoundsChange}
            onClick={this.handleMapClick}
          >
            {marker}
          </Map>
        )}
      </ContainerDimensions>
    )
  }
}

export default UserFormMap
