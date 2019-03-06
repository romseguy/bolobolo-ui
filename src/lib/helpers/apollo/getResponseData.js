export default function getResponseData(response) {
  let result = response

  if (response.result) {
    result = response.result
  }

  if (!result || result.stack) {
    return null
  }

  if (result.data) {
    return result.data
  }

  return result
}
