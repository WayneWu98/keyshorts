type ShortCuts = string[]

interface Config {
  handler: Function,
  disabled?: () => boolean,
  caseSensitive?: boolean,
  repeat?: boolean,
}

interface HTMLElement {
  registerKeyshort: (shortcuts: ShortCuts, opt: Config | Function) => Function,
  activateKeyshorts: Function,
}

interface KeyboardEvent {
  __KEYSHORT_HIT?: boolean
}
