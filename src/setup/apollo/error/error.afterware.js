import { all } from 'ramda'

export default ({ response, options }, next) => {
  //response.raw will be a non-null string
  //response.parsed may be a FetchResult or undefined

  if (!response.parsed || !response.parsed.errors) {
    next()
    return
  }

  const errors = response.parsed.errors.map(
    ({ message, operationName, status }) => {
      switch (operationName) {
        default:
          if (status === 401) {
            return null
          }
      }
    }
  )

  if (all(error => error === null, errors)) {
    delete response.parsed.errors
  }

  next()
}
