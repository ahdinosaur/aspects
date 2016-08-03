module.exports = before

function before (type, fn, hook) {
  if (arguments.length === 2) {
    return before('async', type, fn)
  }

  switch (type) {
    case 'sync':
      return (...args) => {
        const err = hook(fn, args)
        if (err instanceof Error) return err
        const newArgs = err
        return fn(...newArgs)
      }
    case 'async':
      return (...args) => {
        const cb = args.pop()
        hook(fn, args, (err, newArgs) => {
          if (err) cb(err)
          else fn(...[...newArgs, cb])
        })
      }
    default:
      throw new Error('unrecognized before type: '+type)
  }
}
