const test = require('tape')

const { after } = require('../')
const { sync, async } = after

test('after', function (t) {
  t.ok(after, 'module is require-able')
  t.equal(typeof after, 'object', 'module is object')
  t.end()
})

function greet (name) {
  return `Hello, ${name}.`
}

const upper = valueTo('UpperCase')
const lower = valueTo('LowerCase')
function valueTo (name) {
  return (value) => value['to' + name]()
}

function preError (value) {
  return Error('error')
}

test('after sync', function (t) {
  t.equal(greet('Foo'), 'Hello, Foo.')
  const greet2 = sync(greet, upper)
  t.equal(greet2('Foo'), 'HELLO, FOO.')
  const greet3 = sync(greet, lower)
  t.equal(greet3('Foo'), 'hello, foo.')
  const greet4 = sync(sync(greet, lower), upper)
  t.equal(greet4('Foo'), 'HELLO, FOO.')
  const greet5 = sync(sync(greet, upper), lower)
  t.equal(greet5('Foo'), 'hello, foo.')
  const greet6 = sync(greet, preError)
  t.ok(greet6('Foo') instanceof Error)

  t.end()
})

function tick (n, cb) {
  cb(null, n + 1)
}

function double (value, cb) {
  cb(null, value)
}

function prePass (value, cb) {
  setTimeout(function () {
    cb(null, value * 2)
  })
}
function preFail (value, cb) {
  setTimeout(function () {
    cb(new Error('fail'))
  })
}

test('after async', function (t) {
  var n = 2

  async(async(tick, prePass), double)(3, function (err, v) {
    t.error(err)
    t.equal(v, 8)
    next()
  })

  async(async(tick, double), preFail)(3, function (err) {
    t.ok(err instanceof Error)
    next()
  })

  function next () {
    if (--n) return
    t.end()
  }
})
