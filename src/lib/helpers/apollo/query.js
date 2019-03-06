import config from '@/config'
import { noop } from 'lodash-es'
import debug from '@/lib/helpers/debug'

async function query(client, { query, variables }, { cache, from = '' } = {}) {
  let log = noop

  if (config.debug.apollo.query) {
    const operationName = query.definitions[0].name.value
    log = cache =>
      debug(
        `[GRAPHQL] ${from &&
          `[${from}]`} ran [${operationName}] query against ${
          cache ? 'cache' : 'network'
        }`
      )
  }

  if (cache) {
    try {
      const data = client.readQuery({ query, variables })
      log(true)

      return data
    } catch (e) {
      log(false)
      const { data } = await client.query({
        fetchPolicy: 'network-only',
        query,
        variables
      })

      return data
    }
  }

  log(false)
  const { data } = await client.query({
    fetchPolicy: 'network-only',
    query,
    variables
  })

  return data
}

export default query
