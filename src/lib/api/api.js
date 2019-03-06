import Frisbee from 'frisbee'

const frisbee = new Frisbee({
  baseURI: 'http://localhost',
  headers: {
    Accept: 'application/json'
  }
})

export default {
  ...frisbee,

  get(path, options = {}) {
    return frisbee.get(path, {
      'Content-Type': 'application/json',
      ...options
    })
  },

  post(path, options) {
    return frisbee.post(path, options)
  },

  put(path, options) {
    return frisbee.put(path, options)
  },

  del(path, options) {
    return frisbee.del(path, options)
  }
}
