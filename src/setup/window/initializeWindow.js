import debug from '@/lib/helpers/debug'
import getCurrentBreakpoint from '@/lib/helpers/getCurrentBreakpoint'

export default function initializeWindow(window) {
  if (!window) {
    return
  }

  window.offlineMode = false

  window.currentBreakpoint = getCurrentBreakpoint(window.innerWidth)

  debug(`current breakpoint is ${currentBreakpoint}`)

  window.addEventListener('resize', function onWindowResize() {
    if (getCurrentBreakpoint(window.innerWidth) !== window.currentBreakpoint) {
      window.currentBreakpoint = getCurrentBreakpoint(window.innerWidth)

      debug(`current breakpoint is ${window.currentBreakpoint}`)
    }
  })
}
