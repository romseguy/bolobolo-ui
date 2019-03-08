import { NOT_FOUND } from 'redux-first-router'

export const routerActions = {
  HOME: 'HOME_ROUTE',

  ABOUT: 'ABOUT_ROUTE',
  TUTORIAL: 'TUTORIAL_ROUTE',

  AUTH: 'AUTH_ROUTE',
  LOGOUT: 'LOGOUT_ROUTE',

  PLACES: 'PLACES',

  PLACE_VIEW: 'PLACE_VIEW_ROUTE',
  PLACE_SYMBOLS_ADD: 'PLACE_SYMBOLS_ADD',
  PLACE_SYMBOL_EDIT: 'PLACE_SYMBOL_EDIT',

  ME: 'ME_ROUTE',

  ME_PLACES_ADD: 'ME_PLACES_ADD_ROUTE',
  ME_PLACE_EDIT: 'ME_PLACE_EDIT_ROUTE',

  ME_USERS_ADD: 'ME_USERS_ADD_ROUTE',
  ME_USER_VIEW: 'ME_USER_VIEW_ROUTE',
  ME_USER_EDIT: 'ME_USER_EDIT_ROUTE',

  ME_SYMBOLS_ADD: 'ME_SYMBOLS_ADD_ROUTE',
  ME_SYMBOL_VIEW: 'ME_SYMBOL_VIEW_ROUTE',
  ME_SYMBOL_EDIT: 'ME_SYMBOL_EDIT_ROUTE',

  USER_VIEW: 'USER_VIEW_ROUTE',

  notFoundRoute: () => ({
    type: NOT_FOUND
  }),

  homeRoute: payload => ({
    type: routerActions.HOME,
    payload
  }),

  aboutRoute: () => ({
    type: routerActions.ABOUT
  }),

  tutorialRoute: () => ({
    type: routerActions.TUTORIAL
  }),

  authRoute: () => ({
    type: routerActions.AUTH
  }),

  logoutRoute: () => ({
    type: routerActions.LOGOUT
  }),

  placeViewRoute: placeTitle => ({
    type: routerActions.PLACE_VIEW,
    payload: {
      placeTitle
    }
  }),
  placeSymbolsAddRoute: (placeTitle, symbolType) => ({
    type: routerActions.PLACE_SYMBOLS_ADD,
    payload: {
      placeTitle,
      symbolType
    }
  }),

  userViewRoute: username => ({
    type: routerActions.USER_VIEW,
    payload: {
      username
    }
  }),

  meRoute: payload => ({
    type: routerActions.ME,
    payload
  }),

  mePlacesAddRoute: () => ({
    type: routerActions.ME_PLACES_ADD,
    payload: {}
  }),
  mePlaceEditRoute: placeTitle => ({
    type: routerActions.ME_PLACE_EDIT,
    payload: {
      placeTitle
    }
  }),

  meSymbolsAddRoute: name => ({
    type: routerActions.ME_SYMBOLS_ADD,
    payload: {
      name: name.toLowerCase()
    }
  }),
  meSymbolViewRoute: name => ({
    type: routerActions.ME_SYMBOL_VIEW,
    payload: {
      name
    }
  }),
  meSymbolEditRoute: name => ({
    type: routerActions.ME_SYMBOL_EDIT,
    payload: {
      name
    }
  }),

  meUsersAddRoute: () => ({
    type: routerActions.ME_USERS_ADD
  }),
  meUserViewRoute: name => ({
    type: routerActions.ME_USER_VIEW,
    payload: {
      name
    }
  }),
  meUserEditRoute: name => ({
    type: routerActions.ME_USER_EDIT,
    payload: {
      name
    }
  })
}
