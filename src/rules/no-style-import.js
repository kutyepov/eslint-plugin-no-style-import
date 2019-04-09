/**
 * @fileoverview Rule to prevent import of stylesheets in components
 * @author Stanislav Kutyepov
 */

"use strict";

const path = require('path');
const get = require('lodash.get');
const ERROR_MESSAGE = require('../constants/no-style-import-error-message');

const isStylesImport = (importPath = '') => {
    const stylesExtensions = ['.scss', '.css', '.less', '.sass'];
    const extname = path.extname(importPath).split('?')[0];
    return stylesExtensions.includes(extname);
}

const reportError = (node, context) => {
    context.report(node, ERROR_MESSAGE);
};

module.exports = function (context) {

    return {
        ImportDeclaration: function (node) {
            if (isStylesImport(get(node, 'source.value'))) {
                reportError(node, context);
            }
        },
        VariableDeclarator: function (node) {
            const type = get(node, 'init.type');
            const calleeName = get(node, 'init.callee.name');
            const firstArgument = get(node, 'init.arguments[0].value');
            if (type === 'CallExpression' && calleeName === 'require' && isStylesImport(firstArgument)) {
                reportError(node, context);
            }
        },
        ExpressionStatement: function (node) {
            const calleeName = get(node, 'expression.callee.name');
            const firstArgument = get(node, 'expression.arguments[0].value');
            if (calleeName === 'require' && isStylesImport(firstArgument)) {
                reportError(node, context);
            }
        }
    };
};

module.exports.schema = [];