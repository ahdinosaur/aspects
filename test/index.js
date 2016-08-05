const test = require('tape')

const aspects = require('../')

test('aspects', function (t) {
  t.ok(aspects, 'grab bag is require-able')
  t.ok(aspects.before)
  t.ok(aspects.after)
  t.ok(aspects.around)
  t.ok(aspects.sync)
  t.ok(aspects.async)
  t.end()
})

require('./before')
require('./after')
require('./around')
