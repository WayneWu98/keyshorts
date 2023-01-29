type ShortCuts = string[]

interface Config {
  handler: Function,
  disabled?: () => boolean,
  caseSensitive?: boolean,
  repeat?: boolean,
}

declare global {
  interface HTMLElement {
    registerKeyshort: typeof registerKeyshort,
  }

  interface KeyboardEvent {
    __KEYSHORT_HIT?: boolean
  }
}

const DEFAULT_CONFIG: Omit<Config, 'handler'> = {
  disabled: () => false,
  caseSensitive: false,
  repeat: false,
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

function registerKeyshort(this: HTMLElement, shortcuts: ShortCuts, config: Config | Function) {
  return register(this, shortcuts, config as any)
}

HTMLElement.prototype.registerKeyshort = registerKeyshort

export { register }