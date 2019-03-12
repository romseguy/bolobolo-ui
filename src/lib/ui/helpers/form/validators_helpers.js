import { format } from './validators'

export const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

export function prepare(ifCond, unlessCond, allowBlank, func) {
  return function(value = '', allValues = {}) {
    value = '' + value
    if (allowBlank && !value.trim()) {
      return
    }
    if (
      ('function' !== typeof ifCond || ifCond(allValues, value)) &&
      ('function' !== typeof unlessCond || !unlessCond(allValues, value))
    ) {
      return func(value, allValues)
    }
  }
}

export function regFormat(options, reg) {
  options.msg = options.msg || options.message || 'invalid field'
  options.with = reg
  return format(options)
}
