import config from '@/config'

export default function debug(...args) {
  if (config.debug.debug) {
    console.info(...args)
  }
}
