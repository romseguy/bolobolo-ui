import routes from '@/routes'

export default function isLocationAction(action) {
  return !!routes[action.type]
}
