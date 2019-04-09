// /**
//  * @fileoverview Rule to prevent import of stylesheets in components
//  * @author Stanislav Kutyepov
//  */

const rule = require("../../../src/rules/no-style-import");
const ERROR_MESSAGE = require('../../../src/constants/no-style-import-error-message');
const { RuleTester } = require("eslint");

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

const ruleTester = new RuleTester();

"use strict";
ruleTester.run("no-styles-import", rule, {
    valid: [
      "import $ from 'jquery';", 
      "import Component from './path/to/component.js'",
      "import Component from './path/to/component.jsx'",
      "const Component = require('./path/to/component.jsx')",
      "const Component = require('./path/to/component.js')",
      "require('@babel/polyfill')",
    ],

    invalid: [
        {
            code: "import './path/to/styles.css';",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'ImportDeclaration'
            }]
        },
        {
            code: "import * as styles from './path/to/styles.scss?modules';",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'ImportDeclaration'
            }]
        },
        {
            code: "import styles from './path/to/styles.sass';",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'ImportDeclaration'
            }]
        },
        {
            code: "import styles from './path/to/styles.less?modules';",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'ImportDeclaration'
            }]
        },
        {
            code: "const styles = require('./path/to/styles.less?modules');",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'VariableDeclarator'
            }]
        },
        {
            code: "require('./path/to/styles.scss?modules');",
            errors: [{
              message: ERROR_MESSAGE,
              type: 'ExpressionStatement'
            }]
        },
    ]
});