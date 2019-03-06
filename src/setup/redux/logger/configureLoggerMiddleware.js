import { createLogger } from 'redux-logger'
import loggerMiddlewareOptions from './loggerMiddlewareOptions'

export default () => createLogger(loggerMiddlewareOptions)
