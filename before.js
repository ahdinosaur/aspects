var sliced = require('sliced')

module.exports = {
  sync: sync,
  async: async
}

function sync (fn, hook) {
  return function () {
    var args = sliced(arguments)
    var err = hook.call(this, args)
    if (err instanceof Error) return err
    var newArgs = err
    return fn.apply(this, newArgs)
  }
}

function async (fn, hook) {
  return function () {
    var args = sliced(arguments)
    var cb = args.pop()
    hook.call(this, args, function (err, newArgs) {
      if (err) cb(err)
      else fn.apply(this, newArgs.concat([cb]))
    }.bind(this))
  }
}
