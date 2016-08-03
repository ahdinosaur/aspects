const test = require('tape')

const aspects = require('../')

test('aspects', function(t) {
  t.ok(aspects, 'grab bag is require-able')
  t.equal(Object.keys(aspects).length, 3, '3 modules')
  t.end()
})
