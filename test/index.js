const test = require('tape')

const hooki = require('../')

test('hooki', function(t) {
  t.ok(hooki, 'grab bag is require-able')
  t.equal(Object.keys(hooki).length, 3, '3 modules')
  t.end()
})
