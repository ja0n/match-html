# match-html
Check HTML consistency according to a model

## Usage
Ok, here it goes:

```js
import matchHTML from 'match-html'
// or const matchHTML = require('mach-html')

const model = `
  <header>
    <h1 acceptTags="h2|h3|h4"></h1>
  </header>
  <main class="content" attribute="value" >
    <nav childCount="2"> 
      <a></a>
      <a></a>
    </nav>
  </main>
  <footer>
    <span acceptTags="*"></span>
  </footer>
`

const isValid = matchHTML(model, input) // true or false
```

p.s: `matchHTML` handles **whitespace**

## Parameters
Parameters are simply reserved HTML attributes. These are:
* `childCount`: how many childs the node should have
* `acceptTags`: which tags the node can be; delimit with `|`; `*` = any tag

p.s: Any other attribute that is not listed above will take place in the attribute matching
