module.exports = {
  sync,
  async
}

function sync (fn, hook) {
  return (...args) => {
    const errOrValue = fn(...args)
    return errOrValue instanceof Error
      ? errOrValue
      : hook(errOrValue)
  }
}

function async (fn, hook) {
  return (...args) => {
    const cb = args.pop()
    fn(...[...args, (err, value) => {
      if (err) cb(err)
      else hook(value, cb)
    }])
  }
}

