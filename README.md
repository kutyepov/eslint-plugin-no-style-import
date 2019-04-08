# eslint-plugin-no-style-import

Plugin to prevent import of stylesheets in components.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-no-style-import`:

```
$ npm install eslint-plugin-no-style-import --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-no-style-import` globally.

## Usage

Add `no-style-import` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "no-style-import"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "no-style-import/rule-name": 2
    }
}
```

