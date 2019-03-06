const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1Ijoicm9tc2VndXkiLCJhIjoiY2oybmgyaWgxMDAzczJ3cnBvcXFtd3plNiJ9.k1CT7TTYYXlXaXJw-5DUNg'

const mapbox = (mapboxId, accessToken) => (x, y, z) => {
  const retina =
    typeof window !== 'undefined' && window.devicePixelRatio >= 2 ? '@2x' : ''
  return `https://api.mapbox.com/styles/v1/mapbox/${mapboxId}/tiles/256/${z}/${x}/${y}${retina}?access_token=${accessToken}`
}

export default {
  osm: (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3))
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`
  },
  wikimedia: (x, y, z) => {
    const retina =
      typeof window !== 'undefined' && window.devicePixelRatio >= 2 ? '@2x' : ''
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${retina}.png`
  },
  streets: mapbox('streets-v10', MAPBOX_ACCESS_TOKEN),
  satellite: mapbox('satellite-streets-v10', MAPBOX_ACCESS_TOKEN),
  outdoors: mapbox('outdoors-v10', MAPBOX_ACCESS_TOKEN),
  light: mapbox('light-v9', MAPBOX_ACCESS_TOKEN),
  dark: mapbox('dark-v9', MAPBOX_ACCESS_TOKEN)
}
