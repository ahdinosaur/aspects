module.exports = around

function around (type, fn, hook) {
  if (arguments.length === 2) {
    return around('async', type, fn)
  }

  switch (type) {
    case 'sync':
      return (...args) => {
        return hook(fn, args)
      }
    case 'async':
      return (...args) => {
        const cb = args.pop()
        hook(fn, args, cb)
      }
    default:
      throw new Error('unrecognized around type: '+type)
  }
}
