const test = require('tape')

const { before } = require('../')

test('before', function(t) {
  t.ok(before, 'module is require-able')
  t.equal(typeof before, 'function', 'module is function')
  t.end()
})
