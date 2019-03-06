function getRouter(state) {
  return state.location
}

export function getRoutePathname(state) {
  return getRouter(state).pathname
}

export function getRouteType(state) {
  return getRouter(state).type
}

export function getPayload(state) {
  return getRouter(state).payload
}

export function getPrevRoute(state) {
  return getRouter(state).prev
}

export function getPrevRoutePathname(state) {
  return getPrevRoute(state).pathname
}

export function getPrevRouteType(state) {
  return getPrevRoute(state).type
}
