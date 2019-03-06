export default class CustomError extends Error {
  constructor({ name, code, message, cause }) {
    super()
    this.name = name
    this.code = code
    this.message = message
    this.cause = cause
  }
  [Symbol.iterator]() {
    let current = this
    let done = false
    const iterator = {
      next() {
        const val = current
        if (done) {
          return { value: val, done: true }
        }
        current = current.cause
        if (!val.cause) {
          done = true
        }
        return { value: val, done: false }
      }
    }
    return iterator
  }
  get why() {
    let _why = ''
    for (const e of this) {
      _why += `${_why.length ? ' <- ' : ''}${e.name}: ${e.message}`
    }
    return _why
  }
}
