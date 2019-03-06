import React from 'react'

import isNumber from '@/lib/ui/helpers/isNumber'

import { prepare, regFormat } from './validators_helpers'

export function required({ message, msg, if: ifCond, unless } = {}) {
  msg = msg || message

  return prepare(ifCond, unless, false, function(value) {
    if (!value.trim()) {
      return msg
    }
  })
}

export function format({
  with: wit,
  without,
  message,
  msg,
  if: ifCond,
  unless,
  allowBlank = false
}) {
  msg = msg || message

  return prepare(ifCond, unless, allowBlank, function(value) {
    if ((wit && !value.match(wit)) || (without && value.match(without))) {
      return msg || 'invalid field'
    }
  })
}

const REG_EMAIL = /^[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i

export function email(options) {
  options = Object.assign({}, options)
  return regFormat(options, REG_EMAIL)
}

export function confirmation(options) {
  let {
    field,
    fieldLabel,
    caseSensitive = true,
    message,
    msg,
    if: ifCond,
    unless
  } = options
  msg = msg || message

  return prepare(ifCond, unless, false, function(value, allValues) {
    let fieldValue = '' + (allValues[field] || '')

    if (
      caseSensitive
        ? value !== fieldValue
        : value.toLowerCase() !== fieldValue.toLowerCase()
    ) {
      return msg || 'nomatch'
    }
  })
}

export function length(options) {
  let {
    '=': equal,
    is,
    max,
    maximum,
    min,
    minimum,
    in: range,
    within,
    message,
    msg,
    if: ifCond,
    unless,
    allowBlank = true
  } = options
  msg = msg || message

  equal = isNumber(equal) ? equal : is
  min = isNumber(min) ? min : minimum
  max = isNumber(max) ? max : maximum
  range = range || within

  if (range && isNumber(range[0]) && isNumber(range[1])) {
    min = range[0]
    max = range[1]
  }

  return prepare(ifCond, unless, allowBlank, function(value) {
    if (isNumber(equal) && value.length !== +equal) {
      return msg || 'wrong length'
    }
    if (isNumber(max) && value.length > +max) {
      return msg || 'too long'
    }
    if (isNumber(min) && value.length < +min) {
      return msg || 'too short'
    }
  })
}
