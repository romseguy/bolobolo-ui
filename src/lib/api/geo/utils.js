import debug from '@/lib/helpers/debug'

function apiResultIsValid(res, from) {
  const log = args => debug(`from ${from}:`, args)

  if (!res) {
    log('no result from api')
    return false
  } else if (!res.body) {
    log('no body')
    return false
  } else if (!res.body.features || !res.body.features.length) {
    log('no features')
    return false
  }

  return true
}

export function getGeocodedLocation(res) {
  if (!apiResultIsValid(res, 'getGeocodedLocation')) {
    return {}
  }

  const {
    body: { features }
  } = res
  const [lng, lat] = features[0].geometry.coordinates

  return { lat, lng }
}

export function getGeocodedDepartment(res) {
  const context = getGeocodedProperty(res, 'context')
  const matches = context.match(/[0-9]{2}, ([^,]+)/i)

  return Array.isArray(matches) ? matches[1] : false
}

export function getGeocodedProperty(res, property) {
  if (!apiResultIsValid(res, `getGeocodedProperty (${property})`)) {
    return ''
  }

  const {
    body: { features }
  } = res

  return features[0].properties[property]
}
