export default function keepCities(suggest) {
  return !suggest.types.includes('locality')
}
