# keyshorts

**keyshorts** helps you add keyboard shortcuts to your website quickly and easily!!!

## Quick Start

### ES mode

Install dependence.

```shell
npm i keyshorts
```
Require `keyshorts` and register your first keyshort.

```javascript
import 'keyshorts'
// register shortcuts
const unregister = document.querySelector('.div').registerKeyshort(['Shift', 'f'], () => { dosomething() })
// unregister shortcuts
unregister()

// or
import { register } from 'keyshorts'
// register shortcuts
const unregister = register(document.querySelector('.div'), ['Shift', 'f'], () => { dosomething() })
// unregister shortcuts
unregister()
```

### CDN mode

Load dependence.

```html
<script src="https://url/to/keyshorts.umd.js"></script>
```

And then register your first keyshort.

```javascript
// register shortcuts
const unregister = document.querySelector('.div').registerKeyshort(['Shift', 'f'], () => { dosomething() })
// unregister shortcuts
unregister()
```

## API Reference

### register(el: HTMLElement, shortcuts: string[], opt: Function | Opt): Function

register a shortcuts to a html element.

#### el: HTMLElement

Html element that you want register shortcuts to.

#### shortcuts: string[]

An array composed of keys (key of keyboard words), you can get all keys at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values). Pay attention that, letter keys that in same letter but different cases (Upper and lower case) are different shortcuts when `caseSensitive`, for example: `['Shift', 'f']` and `['Shift', 'F']` are different when `caseSensitive` is true, they becomes same when `caseSensitive` is false. (more info about `caseSensitive` is aftertext).

#### opt: Function | Opt

It can be a single function to handle the event that shortcuts was hit.

Or it can be a Object to fully configure behaviors. It is composed these prop blow.

- handler: Function - handle keyboard shortcuts
- disabled?: () => boolean - decide whether should call handler or not, default is `() => false`
- caseSensitive?: boolean - make letter key case sensitive, default is `false`
- repeat?: boolean - decide whether should handle shortcuts event in repeating, default is `false`. (more info about repeat at [MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat))

#### returns

Returns is a method to unregister shortcut.

### HTMLElement.prototype.registerKeyshort(shortcuts: string[], opt: Function | Opt): Function

To register shortcuts in an elegant way, we add a method to the prototype of HTMLElement, you can call it directory in HTMLElement instance like: `document.querySelector('.div').registerKeyshort(...)`.

Params and returns can refer to `register` method.

## Tips

### What will happen if same shortcuts are hit at the same time?

Only shortcuts will hit in the element that shortcuts registered at is focusing. When one shortcuts was hit, other same shortcuts will be ignored. You can ignore one shortcuts by manual to make hitting event propagate to other shortcuts handlers.

### How to register global shortcuts?

Register shortcuts to `document.body`.

### Why it does not works sometime?

Make sure the element is focusing, you can call `focus()` method in manual, and make it uneffective by calling `blur()`.