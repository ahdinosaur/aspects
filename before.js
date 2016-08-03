module.exports = {
  sync,
  async
}

function sync (fn, hook) {
  return (...args) => {
    const err = hook(args)
    if (err instanceof Error) return err
    const newArgs = err
    return fn(...newArgs)
  }
}

function async (fn, hook) {
  return (...args) => {
    const cb = args.pop()
    hook(args, (err, newArgs) => {
      if (err) cb(err)
      else fn(...[...newArgs, cb])
    })
  }
}
