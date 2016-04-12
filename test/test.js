'use strict';

delete require.cache[require.resolve('..')];
var empowerAssert = require('..');
var assert = require('assert');
var fs = require('fs');
var path = require('path');
var babel = require('babel-core');
var extend = require('xtend');

function testTransform (fixtureName, extraOptions, extraSuffix) {
    it(fixtureName, function () {
        var suffix = extraSuffix ? '-' + extraSuffix : '';
        var fixtureFilepath = path.resolve(__dirname, 'fixtures', fixtureName, 'fixture.js');
        var expectedFilepath = path.resolve(__dirname, 'fixtures', fixtureName, 'expected' + suffix + '.js');
        var result = babel.transformFileSync(fixtureFilepath, extend({
            plugins: [
                empowerAssert
            ]
        }, extraOptions));
        var actual = result.code;
        var expected = fs.readFileSync(expectedFilepath).toString();
        assert.equal(actual + '\n', expected);
    });
}

describe('babel-plugin-empower-assert', function () {
    testTransform('commonjs');
});
