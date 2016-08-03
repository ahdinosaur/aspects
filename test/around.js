const test = require('tape')

const { around } = require('../')

test('around', function(t) {
  t.ok(around, 'module is require-able')
  t.equal(typeof around, 'function', 'module is function')
  t.end()
})

function hello (name) {
  return 'Hello, '+name+'.'
}

function post(fn, args) {
  var s = fn.apply(this, args)
  return s.replace('.', '!!!')
}


function pre (fn, args) {
  return fn(args[0].toUpperCase())
}

test('around sync', function (t) {
  const sync = around.bind(null, 'sync')

  t.equal(hello('foo'), 'Hello, foo.')
  const hello2 = sync(hello, post)
  t.equal(hello2('foo'), 'Hello, foo!!!')
  const hello3 = sync(hello, pre)
  t.equal(hello3('foo'), 'Hello, FOO.')
  const hello4 = sync(sync(hello, pre), post)
  t.equal(hello4('foo'), 'Hello, FOO!!!')
  const hello5 = sync(sync(hello, post), pre)
  t.equal(hello5('foo'), 'Hello, FOO!!!')

  t.end()
})

/*
function async (n, cb) {
  cb(null, n + 1)
}

function alwaysAsync(fn, args) {
  var sync = true
  fn(args[0], function (err, value) {
    if(sync) process.nextTick(function () {
      args[1](err, value, false)
    })
    else
      args[1](err, value, true)
  })
  sync = false
}

function double (fn, args) {
  return fn(args[0]*2, args[1])
}

function precheck (fn, args) {
  setTimeout(function () {
    fn.apply(null, args)
  })
}

test('async', function (t) {
  var n = 3

  return around(async)
    (1, function (_, v) {
      t.equal(v, 2)
      next()
    })

  Hoox(async).hook(alwaysAsync).hook(double)
    (3, function (_, v, async) {
      t.equal(v, 7)
      t.notOk(async)
      next()
    })

  Hoox(async).hook(precheck).hook(alwaysAsync)
    (7, function (_, v, async) {
      t.equal(v, 8)
      t.ok(async)
      next()
    })

  function next () {
    if(--n) return
    t.end()
  }
})



test('async, left to right', function (t) {
  var a, b, c
  Hoox(async).hook(function (fn, args) {
    a = true
    fn(args[0], function (_, v) {
      t.equal(v, 4)
      args[1](_, v * 2)
    })
  })
    (3, function (_, v) {

      t.equal(v, 8)
      t.end()
    })

})


test('check a thing, maybe return something different, else change result', function (t) {

  var h = Hoox(function (a) {
    return a * 100
  }).hook(function (fn, args) {
    var a = args[0]

    if(isNaN(a)) return 0

    return ~~fn(a)
  })

  t.equal(h(1/0), 0)
  t.equal(h(0.5), 50)

  t.end()

})
*/
