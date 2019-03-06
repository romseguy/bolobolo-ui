import config from '@/config'
import { noop } from 'lodash-es'
import debug from '@/lib/helpers/debug'

async function mutate(
  client,
  { mutation, refetchQueries, variables },
  { from } = {}
) {
  let log = noop

  if (config.debug.apollo.mutate) {
    const operationName = mutation.definitions[0].name.value
    log = data =>
      debug(
        `[GRAPHQL] ${from ? `${from} ` : ''}ran \`${operationName}\` mutation`,
        data ? data[operationName] : data
      )
  }

  const { data } = await client.mutate({ mutation, refetchQueries, variables })
  log(data)

  return data
}

export default mutate
