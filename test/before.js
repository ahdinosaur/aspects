const test = require('tape')

const { before } = require('../')
const { sync, async } = before

test('before', function(t) {
  t.ok(before, 'module is require-able')
  t.equal(typeof before, 'object', 'module is object')
  t.end()
})

function greet (greeting, name) {
  return `${greeting}, ${name}.`
}

function upper (args) {
  return args.map(a => a.toUpperCase())
}

function lower (args) {
  return args.map(a => a.toLowerCase())
}

function preError (args) {
  return Error('error')
}

test('before sync', function (t) {
  t.equal(greet('Hello', 'Foo'), 'Hello, Foo.')
  const greet2 = sync(greet, upper)
  t.equal(greet2('Hello', 'Foo'), 'HELLO, FOO.')
  const greet3 = sync(greet, lower)
  t.equal(greet3('Hello', 'Foo'), 'hello, foo.')
  const greet4 = sync(sync(greet, upper), lower)
  t.equal(greet4('Hello', 'Foo'), 'HELLO, FOO.')
  const greet5 = sync(sync(greet, lower), upper)
  t.equal(greet5('Hello', 'Foo'), 'hello, foo.')

  t.end()
})
