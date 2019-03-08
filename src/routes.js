import { NOT_FOUND } from 'redux-first-router'

import symbolTypes from '@/lib/constants/symbolTypes'

import { routerActions } from '@/core/router'

import MeContainer from '@/containers/me'
import HomeContainer from '@/containers/home'
import PlaceContainer from '@/containers/place'
import PlacesContainer from '@/containers/places'
import UserContainer from '@/containers/user'

import About from '@/lib/ui/components/about'
import { CanvasManager } from '@/lib/ui/components/canvas'
import { MapManager } from '@/lib/ui/components/map'
import NotFound from '@/lib/ui/components/notFound'
import Tutorial from '@/lib/ui/components/tutorial'

import {
  notFoundRouteSaga,
  rootRoutesaga,
  placesRouteSaga,
  aboutRouteSaga,
  authRouteSaga,
  logoutRouteSaga
} from '@/core/router/sagas/rootRoutes.sagas'

import {
  placeSymbolsAddRouteSaga,
  placeSymbolEditRouteSaga,
  placeViewRouteSaga
} from '@/core/router/sagas/placeRoutes.sagas'

import {
  meRouteSaga,
  mePlacesAddRouteSaga,
  mePlaceEditRouteSaga,
  meSymbolsAddRouteSaga
} from '@/core/router/sagas/meRoutes.sagas'

import { userViewRouteSaga } from '@/core/router/sagas/userRoutes.sagas'

export default {
  [NOT_FOUND]: {
    control: NotFound,
    path: '/not-found',
    saga: notFoundRouteSaga
  },

  [routerActions.HOME]: {
    control: HomeContainer,
    path: '/',
    requiresAuth: false,
    saga: rootRoutesaga
  },

  [routerActions.PLACES]: {
    container: PlacesContainer,
    control: MapManager,
    path: '/places',
    saga: placesRouteSaga,
    requiresAuth: false
  },

  [routerActions.ABOUT]: {
    control: About,
    path: '/about',
    saga: aboutRouteSaga,
    requiresAuth: false
  },

  [routerActions.TUTORIAL]: {
    control: Tutorial,
    path: '/tutorial',
    requiresAuth: false
  },

  [routerActions.AUTH]: {
    path: '/auth',
    saga: authRouteSaga,
    requiresAuth: false
  },

  [routerActions.LOGOUT]: {
    path: '/logout',
    saga: logoutRouteSaga,
    requiresAuth: false
  },

  [routerActions.PLACE_VIEW]: {
    allowedSymbolTypes: [symbolTypes.PARROT],
    container: PlaceContainer,
    control: CanvasManager,
    path: '/place/:placeTitle',
    saga: placeViewRouteSaga
  },
  [routerActions.PLACE_SYMBOLS_ADD]: {
    allowedSymbolTypes: [symbolTypes.PARROT],
    container: PlaceContainer,
    control: CanvasManager,
    path: '/place/:placeTitle/symbols/add/:symbolType',
    saga: placeSymbolsAddRouteSaga
  },
  [routerActions.PLACE_SYMBOL_EDIT]: {
    allowedSymbolTypes: [symbolTypes.PARROT],
    path: '/place/:placeTitle/symbols/add/:symbolType',
    saga: placeSymbolEditRouteSaga
  },

  [routerActions.USER_VIEW]: {
    container: UserContainer,
    control: CanvasManager,
    path: '/user/:username',
    saga: userViewRouteSaga
  },

  [routerActions.ME]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me',
    saga: meRouteSaga
  },

  [routerActions.ME_PLACES_ADD]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me/places/add',
    saga: mePlacesAddRouteSaga
  },
  [routerActions.ME_PLACE_EDIT]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me/place/:placeTitle/edit',
    saga: mePlaceEditRouteSaga
  },

  [routerActions.ME_SYMBOLS_ADD]: {
    container: MeContainer,
    control: CanvasManager,
    allowedSymbolTypes: [],
    path: '/me/symbols/:name/add',
    saga: meSymbolsAddRouteSaga
  },
  [routerActions.ME_SYMBOL_VIEW]: {
    path: '/me/symbol/:name'
  },
  [routerActions.ME_SYMBOL_EDIT]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me/symbol/:name/edit'
  },

  [routerActions.ME_USERS_ADD]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me/users/add'
  },
  [routerActions.ME_USER_VIEW]: {
    path: '/me/user/:name'
  },
  [routerActions.ME_USER_EDIT]: {
    container: MeContainer,
    control: CanvasManager,
    path: '/me/user/:name/edit'
  }
}
