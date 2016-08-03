module.exports = {
  before,
  after,
  around
}

function before (type, fn, hook) {
  if (arguments.length === 2) {
    return before('async', type, fn)
  }

  switch (type) {
    'sync':
      return (...args) => {
        const err = hook(fn, args)
        if (err instanceof Error) return err
        const newArgs = err
        return fn(...newArgs)
      }
    'async':
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

function after (type, fn, hook) {
  if (arguments.length === 2) {
    return after('async', type, fn)
  }

  switch (type) {
    'sync':
      return (...args) => {
        try {
          return hook(null, fn(...args))
        } catch (err) {
          return hook(err)
        }
      }
    'async':
      return (...args) => {
        const cb = args.pop()
        fn(...[...args, (err, value) => {
          else hook(err, value, cb)
        }])
      }
    default:
      throw new Error('unrecognized before type: '+type)
  }
}

function around (type, fn, hook) {
  if (arguments.length === 2) {
    return around('async', type, fn)
  }

  switch (type) {
    'sync':
      return (...args) => {
        return hook(fn, args)
      }
    'async':
      return (...args) => {
        const cb = args.pop()
        hook(fn, args, cb)
      }
    default:
      throw new Error('unrecognized around type: '+type)
  }
}
