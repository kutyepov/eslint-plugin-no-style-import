/**
 * @fileoverview Rule to prevent import of stylesheets in components
 * @author Stanislav Kutyepov
 */

"use strict";

const path = require('path');
const ERROR_MESSAGE = require('./no-style-import-error-message');

const isStylesImport = (importPath) => {
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
            if (isStylesImport(node.source.value)) {
                reportError(node, context);
            }
        },
        VariableDeclarator: function (node) {
            const { init } = node;
            const { type, callee, arguments: argmnts } = init;
            if (type === 'CallExpression' && callee.name === 'require' && isStylesImport(argmnts[0].value)) {
                reportError(node, context);
            }
        },
        ExpressionStatement: function (node) {
            const { expression } = node;
            const { callee, arguments: argmnts } = expression;
            if (callee.name === 'require' && isStylesImport(argmnts[0].value)) {
                reportError(node, context);
            }
        }
    };
};

module.exports.schema = [];