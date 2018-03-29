'use strict';

delete require.cache[require.resolve('..')];
var empowerAssert = require('..');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var extend = require('xtend');

function testTransform (fixtureName, extension) {
    it(fixtureName, function () {
        var fixtureFilepath = path.resolve(__dirname, 'fixtures', fixtureName, 'fixture.' + extension);
        var expectedFilepath = path.resolve(__dirname, 'fixtures', fixtureName, 'expected.' + extension);
        var result = babel.transformFileSync(fixtureFilepath, {
            plugins: [
                empowerAssert
            ]
        });
        var actual = result.code;
        var expected = fs.readFileSync(expectedFilepath).toString();
        assert.equal(actual + '\n', expected);
    });
}

describe('babel-plugin-empower-assert', function () {
    testTransform('commonjs', 'js');
    testTransform('commonjs_singlevar', 'js');
    testTransform('commonjs_powerassert', 'js');
    testTransform('commonjs_strictmode', 'js');
    testTransform('commonjs_singlevar_strictmode', 'js');
    testTransform('assignment', 'js');
    testTransform('assignment_singlevar', 'js');
    testTransform('assignment_strictmode', 'js');
    testTransform('assignment_singlevar_strictmode', 'js');
    testTransform('esm_default_binding', 'mjs');
    testTransform('esm_default_binding_powerassert', 'mjs');
    testTransform('esm_namespace_import', 'mjs');
});
