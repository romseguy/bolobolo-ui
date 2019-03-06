/**
 * @param event touch or mouse event
 * @returns {{clientX, clientY}} client coordinates
 */
export default function getClientPosition(event) {
  const { clientX, clientY } =
    event.clientX !== undefined ? event : event.changedTouches[0]
  return { clientX, clientY }
}
