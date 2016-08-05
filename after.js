var sliced = require('sliced')

module.exports = {
  sync: sync,
  async: async
}

function sync (fn, hook) {
  return function () {
    var errOrValue = fn.apply(this, arguments)
    return errOrValue instanceof Error
      ? errOrValue
      : hook.call(this, errOrValue)
  }
}

function async (fn, hook) {
  return function () {
    var args = sliced(arguments)
    var cb = args.pop()
    fn.apply(this, args.concat([function (err, value) {
      if (err) cb(err)
      else hook.call(this, value, cb)
    }.bind(this)]))
  }
}

