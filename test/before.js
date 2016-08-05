const test = require('tape')

const { before } = require('../')
const { sync, async } = before

test('before', function (t) {
  t.ok(before, 'module is require-able')
  t.equal(typeof before, 'object', 'module is object')
  t.end()
})

function greet (greeting, name) {
  return `${greeting}, ${name}.`
}

const upper = argsTo('UpperCase')
const lower = argsTo('LowerCase')
function argsTo (name) {
  return (args) => args.map(a => a['to' + name]())
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
  const greet6 = sync(greet, preError)
  t.ok(greet6('Hello', 'Foo') instanceof Error)

  t.end()
})

function tick (n, cb) {
  cb(null, n + 1)
}

function double ([arg], cb) {
  cb(null, [arg])
}

function prePass ([arg], cb) {
  setTimeout(function () {
    cb(null, [arg * 2])
  })
}
function preFail ([arg], cb) {
  setTimeout(function () {
    cb(new Error('fail'))
  })
}

test('before async', function (t) {
  var n = 2

  async(async(tick, prePass), double)(3, function (err, v) {
    t.error(err)
    t.equal(v, 7)
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
