const test = require('tape')

const { before } = require('../')

test('before', function(t) {
  t.ok(before, 'module is require-able')
  t.equal(typeof before, 'object', 'module is object')
  t.end()
})
