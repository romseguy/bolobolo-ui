export default function createLatLngObject(lat, lng) {
  if (window.google !== undefined) {
    return new google.maps.LatLng(lat, lng)
  }

  return { lat, lng }
}
