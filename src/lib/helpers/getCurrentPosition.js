import { geolocationErrorTypes } from '@/lib/constants/errorTypes'

export default function getCurrentPosition(options) {
  return new Promise((resolve, reject) => {
    if (!'geolocation' in navigator) {
      reject(geolocationErrorTypes.NO_GEOLOCATION_SUPPORT)
    } else {
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        error => reject(error),
        options
      )
    }
  })
}
