# keyshorts

**keyshorts** help you add keyboard shortcuts to your website quickly and easily!!!

## Quick Start

### ES mode

Install dependence.

```shell
npm i keyshorts
```
Require `keyshorts` and register your first keyshort.

```javascript
import 'keyshorts'
// register shortcut
const unregister = document.querySelector('.div').registerKeyshort(['Shift', 'f'], () => { dosomething() })
// unregister shortcut
unregister()

// or
import { register } from 'keyshorts'
// register shortcut
const unregister = register(document.querySelector('.div'), ['Shift', 'f'], () => { dosomething() })
// unregister shortcut
unregister()
```

### CDN mode

Load dependence.

```html
<script src="https://url/to/keyshorts.umd.jd"></script>
```

And then register your first keyshort.

```javascript
// register shortcut
const unregister = document.querySelector('.div').registerKeyshort(['Shift', 'f'], () => { dosomething() })
// unregister shortcut
unregister()
```

## API Reference

### register(el: HTMLElement, shortcuts: string[], opt: Function | Opt): Function

register a shortcut to a html element.

#### el: HTMLElement

Html element that you want register shortcut to.

#### shortcuts: string[]

An array composed of keys (key of keyboard words), you can get all keys at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values). Pay attention that, letter keys that in same letter but different cases (Upper and lower case) are different shortcuts when `caseSensitive`, for example: `['Shift', 'f']` and `['Shift', 'F']` are different when `caseSensitive` is true, they becomes same when `caseSensitive` is false. (more info about `caseSensitive` is aftertext).

#### opt: Function | Opt

It can be a single function to handle the event that shortcut was hit.

Or it can be a Object to fully configure behaviors. It is composed these prop blow.

- handler: Function - handle keyboard shortcut
- disabled?: () => boolean - decide whether should call handler or not, default is `() => false`
- caseSensitive?: boolean - make letter key case sensitive, default is `false`
- repeat?: boolean - decide whether should handle shortcut event in repeating, default is `false`. (more info about repeat at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat))

#### returns

Returns is a method to unregister shortcut.

### HTMLElement.prototype.registerKeyshort(shortcuts: string[], opt: Function | Opt): Function

To register shortcut in an elegant way, we add a method to the prototype of HTMLElement, you can call it directory in HTMLElement instance like: `document.querySelector('.div').registerKeyshort(...)`.

Params and returns can refer to `register` method.

## Tips

### What will happen if same shortcuts are hit at the same time?

Only shortcuts will hit in the element that shortcuts registered at is focusing. When one shortcut was hit, other same shortcuts will be ignored. You can ignore one shortcut by manual to make hitting event propagate to other shortcut handlers.