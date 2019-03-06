import { connectRoutes } from 'redux-first-router'

function configureRouter(routes) {
  return connectRoutes(routes, { initialDispatch: false })
}

export default configureRouter
