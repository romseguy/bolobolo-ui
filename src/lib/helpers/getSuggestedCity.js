export default function getSuggestedCity(suggest) {
  const address_component = suggest.gmaps.address_components.find(
    address_component => {
      return address_component.types.includes('locality')
    }
  )

  return address_component.short_name
}
