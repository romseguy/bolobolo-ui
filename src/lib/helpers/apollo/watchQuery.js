import config from '@/config'
import debug from '@/lib/helpers/debug'

export default function watchQuery(
  client,
  { query, variables },
  { from = '', onError, onNext }
) {
  let log = noop

  if (config.debug.apollo.watchQuery) {
    const operationName = query.definitions[0].name.value

    log = ({ error, results } = {}) => {
      if (error) {
        debug(
          `[GRAPHQL] ${from &&
            `[${from}]`} was watching query [${operationName}] and got error`,
          error
        )
      } else if (results) {
        debug(
          `[GRAPHQL] ${from &&
            `[${from}]`} was watching query [${operationName}] and got results`,
          results
        )
      } else {
        debug(
          `[GRAPHQL] ${from &&
            `[${from}]`} is watching query [${operationName}]`
        )
      }
    }
  }

  log()

  client.watchQuery({ query, variables }).subscribe({
    error: error => {
      log({ error })
      onError(error)
    },
    next: results => {
      log({ results })
      onNext(results.data)
    }
  })
}
