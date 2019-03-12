const isDev = process.env.NODE_ENV === 'development'

export default {
  debug: {
    apollo: {
      mutate: true && isDev,
      query: true && isDev,
      watchQuery: true && isDev
    },
    debug: true && isDev,
    devTools: true && isDev,
    i18n: false && isDev,
    logger: true && isDev
  },
  mocking: false
}
