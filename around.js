var sliced = require('sliced')

module.exports = {
  sync: sync,
  async: async
}

function sync (fn, hook) {
  return function () {
    var args = sliced(arguments)
    return hook.call(this, fn, args)
  }
}

function async (fn, hook) {
  return function () {
    var args = sliced(arguments)
    var cb = args.pop()
    hook.call(this, fn, args, cb)
  }
}
