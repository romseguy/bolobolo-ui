export default function isNumber(num) {
  return typeof num === 'number' && !isNaN(num) && '' !== ('' + num).trim()
}
