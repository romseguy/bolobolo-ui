import isNumber from './isNumber'

function invertNumber(num) {
  return num > 0 ? -num : Math.abs(num)
}

export default function invert(num) {
  if (isNumber(num)) {
    return invertNumber(num)
  }

  return num
}
