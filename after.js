module.exports = after

function after (type, fn, hook) {
  if (arguments.length === 2) {
    return after('async', type, fn)
  }

  switch (type) {
    case 'sync':
      return (...args) => {
        try {
          return hook(null, fn(...args))
        } catch (err) {
          return hook(err)
        }
      }
    case 'async':
      return (...args) => {
        const cb = args.pop()
        fn(...[...args, (err, value) => {
          hook(err, value, cb)
        }])
      }
    default:
      throw new Error('unrecognized before type: '+type)
  }
}

