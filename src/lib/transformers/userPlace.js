import roleTypes from '@/lib/constants/roleTypes'
import { placeToNode } from '@/lib/transformers'

export const userPlaceToNode = (id, userPlace) => {
  const {
    place,
    role: { id: roleId },
    x,
    y
  } = userPlace

  const mine = roleId === roleTypes.GUARDIAN

  return placeToNode(id, place, { mine, x, y })
}
