import { call, delay, getContext, put, race } from 'redux-saga/effects'

import debug from '@/lib/helpers/debug'
import getCurrentPosition from '@/lib/helpers/getCurrentPosition'
import geo from '@/lib/api/geo'
import CustomError from '@/lib/classes/customError'
import { geolocationErrorTypes } from '@/lib/constants/errorTypes'
import { toggleErrorModalSaga } from '@/lib/modals'

import { settingsActions } from '@/core/settings'
import setDefaultLocationSaga from './setDefaultLocation.saga'

export default function* initializeUserLocationSaga() {
  const i18n = yield getContext('i18n')

  try {
    const currentPosition = yield call(getCurrentPosition, {
      maximumAge: 15000,
      timeout: 30000,
      enableHighAccuracy: false
    })

    const {
      coords: { latitude: lat, longitude: lng }
    } = currentPosition
    yield put(settingsActions.setLocation(lat, lng))

    const { locationData, locationDataTimeout } = yield race({
      locationData: call([geo, geo.getLocationData], lat, lng),
      locationDataTimeout: delay(10000)
    })

    if (locationDataTimeout) {
      throw new CustomError({
        code: geolocationErrorTypes.TIMEOUT_LOCATION_DATA
      })
    }

    if (locationData) {
      const { department, city } = locationData

      yield put(settingsActions.setDepartment(department))
      yield put(settingsActions.setCity(city))
    }
  } catch (error) {
    if (error === geolocationErrorTypes.NO_GEOLOCATION_SUPPORT) {
      yield call(setDefaultLocationSaga)
    } else if (error.code === geolocationErrorTypes.USER_DENIED_GEOLOCATION) {
      yield call(setDefaultLocationSaga)
    } else if (error.code === geolocationErrorTypes.USER_IS_OFFLINE) {
      if (process.env.NODE_ENV !== 'development') {
        yield call(toggleErrorModalSaga, {
          modalComponentProps: {
            title: i18n.t('errors:modal.offline.title'),
            errors: [i18n.t('errors:modal.offline.content')]
          }
        })
      }

      yield call(setDefaultLocationSaga)
    } else if (error.code === geolocationErrorTypes.TIMEOUT_EXPIRED) {
      yield call(setDefaultLocationSaga)
    } else if (error.code === geolocationErrorTypes.TIMEOUT_LOCATION_DATA) {
      yield put(settingsActions.setDepartment(false))
      yield put(settingsActions.setCity(false))
    } else {
      debug(error)
    }
  }
}
