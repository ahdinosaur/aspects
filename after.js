module.exports = {
  sync,
  async
}

function sync (fn, hook) {
  return (...args) => {
    const errOrValue = fn(...args)
    return errOrValue instanceof Error
      ? hook(errOrValue)
      : hook(null, errOrValue)
  }
}

function async (fn, hook) {
  return (...args) => {
    const cb = args.pop()
    fn(...[...args, (err, value) => {
      hook(err, value, cb)
    }])
  }
}

