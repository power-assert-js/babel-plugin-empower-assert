'use strict';

var foo = 'FOO',
    assert = require("power-assert"),
    bar = 'BAR';

function add(a, b) {
  assert(!isNaN(a));
  assert.equal(typeof b, 'number');
  assert.ok(!isNaN(b));
  return a + b;
}