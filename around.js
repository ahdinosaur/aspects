module.exports = {
  sync,
  async
}

function sync (fn, hook) {
  return (...args) => {
    return hook(fn, args)
  }
}

function async (fn, hook) {
  return (...args) => {
    const cb = args.pop()
    hook(fn, args, cb)
  }
}
