import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloLink, concat } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { RetryLink } from 'apollo-link-retry'
import { SchemaLink } from 'apollo-link-schema'
import { buildClientSchema } from 'graphql'
import { addMockFunctionsToSchema } from 'graphql-tools'
import config from '@/config'
import debug from '@/lib/helpers/debug'
import getLang from '@/lib/helpers/getLang'
import introspectionResult from '@/lib/graphql/graphql.schema.json'

function configureClient() {
  const uri = `${process.env.REACT_APP_GRAPHQL_URL}?locale=${getLang()}`
  const httpLink = createHttpLink({ uri })
  const token = localStorage.getItem('token')

  const authLink = setContext(() => ({
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }))

  const errorLink = onError(({ networkError = {}, graphQLErrors }) => {
    console.log('$$$networkError', networkError)
    console.log('$$$graphQLErrors', graphQLErrors)

    if (networkError.statusCode === 401) {
      // logout();
    }
  })

  const loggerLink = new ApolloLink((operation, forward) => {
    debug(operation.operationName)
    return forward(operation).map(result => {
      debug(`received result from ${operation.operationName}`, result)
      return result
    })
  })

  const retryLink = new RetryLink({
    attempts: (count, operation, error) => {
      return !!error // && operation.operationName != 'specialCase'
    },
    delay: (count, operation, error) => {
      return count * 1000 * Math.random()
    }
  })

  const links = [authLink, errorLink, loggerLink]

  if (config.mocking) {
    // const mocks = {
    //   Query: () => {

    //   }
    // }

    const schema = buildClientSchema(introspectionResult.data)

    // procedure...
    addMockFunctionsToSchema({ schema })

    const schemaLink = new SchemaLink({
      schema
    })

    links.push(schemaLink)
  } else {
    links.push(httpLink)
  }

  return new ApolloClient({
    link: ApolloLink.from(links),
    cache: new InMemoryCache()
  })
}

export default configureClient
