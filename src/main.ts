const DEFAULT_CONFIG: Omit<Config, 'handler'> = {
  disabled: () => false,
  caseSensitive: false,
}

function register(el: HTMLElement, shortcuts: ShortCuts, config: Config): Function
function register(el: HTMLElement, shortcuts: ShortCuts, config: Function): Function
function register(el: HTMLElement, shortcuts: ShortCuts, config: any) {
  el.tabIndex = el.tabIndex
  shortcuts.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  const { disabled, caseSensitive, repeat } = typeof config === 'function' ? DEFAULT_CONFIG : config
  const handler = typeof config === 'function' ? config : config.handler
  const pressed = new Set<string>()
  const checkMatched = () => {
    const sorted = [...pressed].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
    return shortcuts.every((key, i) => {
      if (!caseSensitive && key.length === 1) {
        return key.toLowerCase() === sorted[i].toLowerCase()
      }
      return key === sorted[i]
    })
  }
  const handleKeydown = (e: KeyboardEvent) => {
    pressed.add(e.key)
    if (checkMatched() && !e.__KEYSHORT_HIT && !disabled?.()) {
      e.preventDefault()
      e.__KEYSHORT_HIT = true
      if (e.repeat && !repeat) return
      handler()
    }
  }
  const reset = () => pressed.clear()
  el.addEventListener('keydown', handleKeydown)
  el.addEventListener('keyup', reset)
  return () => {
    el.removeEventListener('keydown', handleKeydown)
    el.removeEventListener('keyup', reset)
  }
}

HTMLElement.prototype.registerKeyshort = function(shortcuts, config) {
  return register(this, shortcuts, config as any)
}

export { register }