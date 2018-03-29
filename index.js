/**
 * babel-plugin-empower-assert
 *   Babel plugin to convert assert to power-assert at compile time
 * 
 * https://github.com/power-assert-js/babel-plugin-empower-assert
 *
 * Copyright (c) 2016 Takuto Wada
 * Licensed under the MIT license.
 *   https://github.com/power-assert-js/babel-plugin-empower-assert/blob/master/LICENSE
 */
'use strict';

module.exports = function (babel) {
    return {
        visitor: {
            AssignmentExpression: {
                enter: function (nodePath, pluginPass) {
                    if (!nodePath.equals('operator', '=')) {
                        return;
                    }
                    var left = nodePath.get('left');
                    if (!left.isIdentifier()) {
                        return;
                    }
                    if (!left.equals('name', 'assert')) {
                        return;
                    }
                    var right = nodePath.get('right');
                    if (!right.isCallExpression()) {
                        return;
                    }
                    replaceAssertIfMatch(right);
                }
            },
            VariableDeclarator: {
                enter: function (nodePath, pluginPass) {
                    var id = nodePath.get('id');
                    if (!id.isIdentifier()) {
                        return;
                    }
                    if (!id.equals('name', 'assert')) {
                        return;
                    }
                    var init = nodePath.get('init');
                    if (!init.isCallExpression()) {
                        return;
                    }
                    replaceAssertIfMatch(init);
                }
            },
            ImportDeclaration: {
                enter: function (nodePath, pluginPass) {
                    var source = nodePath.get('source');
                    if (!(source.equals('value', 'assert'))) {
                        return;
                    }
                    var firstSpecifier = nodePath.get('specifiers')[0];
                    if (!(firstSpecifier.isImportDefaultSpecifier() || firstSpecifier.isImportNamespaceSpecifier())) {
                        return;
                    }
                    var local = firstSpecifier.get('local');
                    if (!(local.equals('name', 'assert'))) {
                        return;
                    }
                    source.set('value', 'power-assert');
                }
            }
        }
    };
};

function replaceAssertIfMatch (node) {
    var callee = node.get('callee');
    var arg = node.get('arguments')[0];
    if (isRequireAssert(callee, arg)) {
        arg.set('value', 'power-assert');
    }
}

function isRequireAssert (callee, arg) {
    if (!callee.isIdentifier() || !callee.equals('name', 'require')) {
        return false;
    }
    return (arg.isLiteral() && arg.equals('value', 'assert'));
}
