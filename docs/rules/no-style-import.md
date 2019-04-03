# Rule to prevent import of stylesheets in components (no-style-import)

The rule is created for libraries that should not bundle JS code and CSS stylesheets together because developers of a library do no know which styles components are going to be consumed with and to decrease bundle size.


## Rule Details

This rule aims to prevent import stylesheets withing components' code.

Examples of **incorrect** code for this rule:

```js
// ES6
import './path/to/styles.css';
import styles from './path/to/styles.scss';
import * as classNames from './path/to/styles.less?modules';
// ES5
require('./path/to/styles.css');
const s = require('./path/to/styles.scss?modules');

```

## When Not To Use It

This rule should not be used in applications consume components' libraries and create bundles.

